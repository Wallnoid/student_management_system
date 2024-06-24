import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Tooltip,
  Textarea,
  DateInput,
} from "@nextui-org/react";

import { PlusIcon } from "../../../../components/shared/icons";
import { Toaster } from "react-hot-toast";

import { currentUser } from "@/services/users.service";
import InputSearch from "@/components/shared/input_search";
import { optionsElements, statusColorMap } from "../constants/constants";

import ResponsiblesHook from "../hooks/responsibles_hook";
import { Event } from "@/interfaces/Event";
import FormikEvents from "../constants/formik";
import { actualDate } from "@/constants/date_constants";
import { dateFinalHook, dateInicioHook } from "@/hooks/date_hook";

export default function FormModal({
  event,
  icon: button,
}: {
  event?: Event;
  icon?: JSX.Element;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { responsibles, setResponsibles } = ResponsiblesHook();

  const { fecha, setFecha } = dateInicioHook(event?.fecha_inicio);

  const { fechaFinal, setFechaFinal } = dateFinalHook(
    actualDate,
    event?.fecha_fin
  );

  const onChangesResponsable = (value: string) => {
    formik.setFieldValue("responsable", value);
  };

  const onChangesEstado = (value: string) => {
    formik.setFieldValue("estado", value);
  };

  const formik = FormikEvents(event, currentUser, onClose);

  const asignFechas = () => {
    console.log(typeof fecha);
    const fechaAsDate = new Date(fecha.year, fecha.month - 1, fecha.day);

    const fechaFinalAsDate = new Date(
      fechaFinal.year,
      fechaFinal.month - 1,
      fechaFinal.day
    );

    formik.setFieldValue("fecha_inicio", fechaAsDate);
    formik.setFieldValue("fecha_fin", fechaFinalAsDate);
  };

  return (
    <>
      <Toaster />
      {!event ? (
        <Button
          color="primary"
          endContent={<PlusIcon />}
          onPress={onOpen}
          id="AddMemberButton"
        >
          Agregar Evento
        </Button>
      ) : (
        <Tooltip content="Editar Evento">
          <span
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={onOpen}
          >
            {button}
          </span>
        </Tooltip>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {event ? (
                  <div className="flex flex-row items-center">
                    <div className="w-1/2">{"Actualizar Evento"}</div>

                    <div className="w-1/2 mx-5">
                      <InputSearch
                        label=""
                        placeholder=""
                        elements={optionsElements}
                        name="estado"
                        onChange={onChangesEstado}
                        value={formik.values.estado}
                        color={statusColorMap[formik.values.estado]}
                      ></InputSearch>
                    </div>
                  </div>
                ) : (
                  "Ingresar Evento"
                )}
              </ModalHeader>

              <form onSubmit={formik.handleSubmit}>
                <ModalBody>
                  <Input
                    autoFocus
                    id={`nombre_${event?.id || ""}`}
                    label="Nombre"
                    name="nombre"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.nombre !== undefined}
                    errorMessage={formik.errors.nombre}
                    placeholder="Ingresa el nombre del evento"
                    variant="bordered"
                    type="text"
                  />

                  <Textarea
                    label="Descripcion"
                    name="descripcion"
                    value={formik.values.descripcion}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.descripcion !== undefined}
                    errorMessage={formik.errors.descripcion}
                    placeholder="Escribe una descripcion"
                    className={`flex 
                      ${formik.errors.nombre !== undefined ? "py-0" : "py-3"} 
                      justify-between`}
                    variant="bordered"
                    maxRows={3}
                  />

                  <InputSearch
                    elements={responsibles}
                    label="Responsable"
                    placeholder="Buscar responsable"
                    name="responsable"
                    value={formik.values.responsable}
                    onChange={onChangesResponsable}
                    isInvalid={formik.errors.responsable !== undefined}
                    className={`flex 
                        ${formik.errors.nombre !== undefined ? "py-0" : "py-3"} 
                        justify-between`}
                    errorMessage={formik.errors.responsable}
                  ></InputSearch>
                  <div
                    className={`flex 
                  ${
                    formik.errors.descripcion !== undefined ? "py-0" : "py-3"
                  } justify-between`}
                  >
                    <DateInput
                      value={fecha}
                      onChange={(date) => {
                        setFecha(date);
                      }}
                      label="Fecha Inicio"
                      className="max-w-[284px]"
                      isInvalid={formik.errors.fecha_inicio !== undefined}
                      errorMessage={formik.errors.fecha_inicio}
                    />

                    <div className=" w-2"></div>
                    <DateInput
                      value={fechaFinal}
                      onChange={(date) => {
                        setFechaFinal(date);
                      }}
                      label="Fecha Final"
                      className="max-w-[284px]"
                      isInvalid={formik.errors.fecha_fin !== undefined}
                      errorMessage={formik.errors.fecha_fin}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    id="CloseButton"
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  <Button
                    id="SubmitButton"
                    color="primary"
                    type="submit"
                    onPress={asignFechas}
                    isLoading={formik.isSubmitting}
                  >
                    {event ? "Actualizar" : "Registrar"}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
