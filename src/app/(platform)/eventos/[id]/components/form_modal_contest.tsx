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
  TimeInput,
  TimeInputValue,
} from "@nextui-org/react";

import { Toaster } from "react-hot-toast";

import { currentUser } from "@/services/users.service";
import InputSearch from "@/components/shared/input_search";
import { optionsElements, statusColorMap } from "../constants/constants";
import { ClubInternos } from "@/interfaces/ClubInternos";
import { PlusIcon } from "@/components/shared/icons";
import FormikClubes from "@/app/(platform)/clubes/constants/formik";
import MemberElementHook from "@/app/(platform)/clubes/hooks/members_hook";
import { Contest } from "@/interfaces/Contest";
import FormikContest from "../constants/formik_contests";
import { actualDate } from "@/constants/date_constants";
import { dateFinalHook, dateInicioHook } from "@/hooks/date_hook";
import { timeFinalHook, timeInicioHook } from "@/hooks/time_hook";

export default function FormModal({
  contest,
  icon: button,
  id_event,
}: {
  contest?: Contest;
  icon?: JSX.Element;
  id_event: string;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { members, setMembers } = MemberElementHook();

  const { fecha, setFecha } = dateInicioHook("2023-09-12");

  const { fechaFinal, setFechaFinal } = dateFinalHook(actualDate, "2023-12-12");

  const { time, setTime } = timeInicioHook("");

  const { timeFinal, setTimeFinal } = timeFinalHook("");

  const onChangesPresidente = (value: string) => {
    formik.setFieldValue("presidente", value);
  };

  const onChangesEstado = (value: string) => {
    formik.setFieldValue("estado", value);
  };

  const formik = FormikContest(contest, currentUser, onClose);

  return (
    <>
      <Toaster />
      {!contest ? (
        <Button
          color="primary"
          endContent={<PlusIcon />}
          onPress={onOpen}
          id="AddMemberButton"
        >
          Agregar Concurso
        </Button>
      ) : (
        <Tooltip content="Editar Concurso">
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
                {contest ? (
                  <div className="flex flex-row items-center">
                    <div className="w-1/2">{"Actualizar club"}</div>

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
                  "Ingresar Club"
                )}
              </ModalHeader>

              <form onSubmit={formik.handleSubmit}>
                <ModalBody>
                  <Input
                    autoFocus
                    id={`nombre_${contest?.id || ""}`}
                    label="Nombre"
                    name="nombre"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.nombre !== undefined}
                    errorMessage={formik.errors.nombre}
                    placeholder="Ingresa el nombre del club"
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
                    elements={members}
                    label="Presidente"
                    placeholder="Buscar presidente"
                    name="presidente"
                    value={formik.values.responsable}
                    onChange={onChangesPresidente}
                    isInvalid={formik.errors.responsable !== undefined}
                    className={`flex 
                          ${
                            formik.errors.descripcion !== undefined
                              ? "py-0"
                              : "py-3"
                          } 
                          justify-between`}
                    errorMessage={formik.errors.responsable}
                  ></InputSearch>

                  <Input
                    id={`ubicacion_${contest?.id || ""}`}
                    label="Ubicacion"
                    name="ubicacion"
                    value={formik.values.ubicacion}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.ubicacion !== undefined}
                    errorMessage={formik.errors.ubicacion}
                    placeholder="Ingresa la ubicacion del club"
                    className={
                      formik.errors.responsable !== undefined ? "py-0" : "py-3"
                    }
                    variant="bordered"
                    type="text"
                  />
                  <div
                    className={`flex 
                  ${
                    formik.errors.ubicacion !== undefined ? "py-0" : "py-3"
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
                  <div
                    className={`flex 
                  ${
                    formik.errors.fecha_inicio !== undefined ||
                    formik.errors.fecha_fin !== undefined
                      ? "py-0"
                      : "py-3"
                  } justify-between`}
                  >
                    <TimeInput
                      value={time}
                      onChange={(time) => {
                        setTime(time);
                      }}
                      label="Fecha Inicio"
                      className="max-w-[284px]"
                      isInvalid={formik.errors.hora_inicio !== undefined}
                      errorMessage={formik.errors.hora_inicio}
                    />

                    <div className=" w-2"></div>
                    <TimeInput
                      value={timeFinal}
                      onChange={(time) => {
                        setTimeFinal(time);
                      }}
                      label="Fecha Final"
                      className="max-w-[284px]"
                      isInvalid={formik.errors.hora_fin !== undefined}
                      errorMessage={formik.errors.hora_fin}
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
                    isLoading={formik.isSubmitting}
                  >
                    {contest ? "Actualizar" : "Registrar"}
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
