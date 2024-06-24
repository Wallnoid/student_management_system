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
} from "@nextui-org/react";

import { Toaster } from "react-hot-toast";

import { currentUser } from "@/services/users.service";
import InputSearch from "@/components/shared/input_search";
import { PlusIcon } from "@/components/shared/icons";
import { Talk } from "@/interfaces/Talk";
import FormikTalks from "../../constants/formik_talks";
import { dateInicioHook } from "@/hooks/date_hook";
import { timeFinalHook, timeInicioHook } from "@/hooks/time_hook";
import { getUrl } from "@/utils/utils";
import { optionsElements, statusColorMap } from "@/constants/constants";

export default function FormModal({
  talk,
  icon: button,
}: {
  talk?: Talk;
  icon?: JSX.Element;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { fecha, setFecha } = dateInicioHook(talk?.fecha || "");

  const { time, setTime } = timeInicioHook(talk?.hora_inicio || "");

  const { timeFinal, setTimeFinal } = timeFinalHook(talk?.hora_fin || "");

  const url = getUrl();

  const id_event = url.substring(url.lastIndexOf("/") + 1);

  const onChangesEstado = (value: string) => {
    formik.setFieldValue("estado", value);
  };

  const asignFechas = () => {
    console.log(typeof fecha);
    const fechaAsDate = new Date(fecha.year, fecha.month - 1, fecha.day);

    formik.setFieldValue("fecha", fechaAsDate);
  };

  const asignarHoras = () => {
    const timeToString = time.toString().slice(0, 5);

    const timeFinalToString = timeFinal.toString().slice(0, 5);

    console.log(timeToString);

    formik.setFieldValue("hora_inicio", timeToString);
    formik.setFieldValue("hora_fin", timeFinalToString);
  };

  const asignarValores = () => {
    formik.setFieldValue("id_evento", id_event);

    asignFechas();

    asignarHoras();
  };

  const formik = FormikTalks(talk, currentUser, onClose);

  return (
    <>
      <Toaster />
      {!talk ? (
        <Button
          color="primary"
          endContent={<PlusIcon />}
          onPress={onOpen}
          id="AddMemberButton"
        >
          Agregar Charla
        </Button>
      ) : (
        <Tooltip content="Editar Charla">
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
                {talk ? (
                  <div className="flex flex-row items-center">
                    <div className="w-1/2">{"Actualizar Charla"}</div>

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
                  "Ingresar Charla"
                )}
              </ModalHeader>

              <form onSubmit={formik.handleSubmit}>
                <ModalBody>
                  <Input
                    autoFocus
                    id={`nombre_${talk?.id || ""}`}
                    label="Nombre"
                    name="nombre"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.nombre !== undefined}
                    errorMessage={formik.errors.nombre}
                    placeholder="Ingresa el nombre de la charla"
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

                  <Input
                    id={`lugar_${talk?.id || ""}`}
                    label="Lugar"
                    name="lugar"
                    value={formik.values.lugar}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.lugar !== undefined}
                    errorMessage={formik.errors.lugar}
                    placeholder="Ingresa el lugar del club"
                    className={
                      formik.errors.nombre !== undefined ? "py-0" : "py-3"
                    }
                    variant="bordered"
                    type="text"
                  />
                  <div
                    className={`flex 
                  ${
                    formik.errors.lugar !== undefined ? "py-0" : "py-3"
                  } justify-between gap-9 md:gap-2 flex-col md:flex-row`}
                  >
                    <DateInput
                      value={fecha}
                      onChange={(date) => {
                        setFecha(date);
                      }}
                      label="Fecha"
                      className="w-full"
                      isInvalid={formik.errors.fecha !== undefined}
                      errorMessage={formik.errors.fecha}
                    />

                    <TimeInput
                      value={time}
                      onChange={(time) => {
                        setTime(time);
                      }}
                      label="Hora Inicio"
                      className="w-full"
                      isInvalid={formik.errors.hora_inicio !== undefined}
                      errorMessage={formik.errors.hora_inicio}
                    />

                    <TimeInput
                      value={timeFinal}
                      onChange={(time) => {
                        setTimeFinal(time);
                      }}
                      label="Hora Final"
                      className="w-full"
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
                    onPress={asignarValores}
                    isLoading={formik.isSubmitting}
                  >
                    {talk ? "Actualizar" : "Registrar"}
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
