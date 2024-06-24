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
import { optionsElements, statusColorMap } from "../../constants/constants";
import { ClubInternos } from "@/interfaces/ClubInternos";
import { PlusIcon } from "@/components/shared/icons";
import FormikClubes from "@/app/(platform)/clubes/constants/formik";
import MemberElementHook from "@/app/(platform)/clubes/hooks/members_hook";
import { Contest } from "@/interfaces/Contest";
import FormikContest from "../../constants/formik_contests";
import { actualDate } from "@/constants/date_constants";
import { dateFinalHook, dateInicioHook } from "@/hooks/date_hook";
import { timeFinalHook, timeInicioHook } from "@/hooks/time_hook";
import { getUrl } from "@/utils/utils";

export default function FormModal({
  contest,
  icon: button,
}: {
  contest?: Contest;
  icon?: JSX.Element;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { members, setMembers } = MemberElementHook();

  const { fecha, setFecha } = dateInicioHook(contest?.fecha_inicio || "");

  const { fechaFinal, setFechaFinal } = dateFinalHook(
    actualDate,
    contest?.fecha_fin || ""
  );

  const { time, setTime } = timeInicioHook("");

  const { timeFinal, setTimeFinal } = timeFinalHook("");

  const url = getUrl();

  const id_event = url.substring(url.lastIndexOf("/") + 1);

  const onChangesReponsable = (value: string) => {
    formik.setFieldValue("responsable", value);
  };

  const onChangesEstado = (value: string) => {
    formik.setFieldValue("estado", value);
  };

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

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size={"3xl"}
      >
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
                    label="Responsable"
                    placeholder="Buscar responsable"
                    name="responsable"
                    value={formik.values.responsable}
                    onChange={onChangesReponsable}
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
                    id={`lugar_${contest?.id || ""}`}
                    label="Lugar"
                    name="lugar"
                    value={formik.values.lugar}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.lugar !== undefined}
                    errorMessage={formik.errors.lugar}
                    placeholder="Ingresa el lugar del club"
                    className={
                      formik.errors.responsable !== undefined ? "py-0" : "py-3"
                    }
                    variant="bordered"
                    type="text"
                  />

                  <div
                    className={`flex 
                  ${
                    formik.errors.lugar !== undefined ? "py-0" : "py-3"
                  } justify-between gap-2`}
                  >
                    <Input
                      id={`numero_participantes_${contest?.id || ""}`}
                      label="N° de participantes"
                      name="cant_participantes"
                      value={formik.values.cant_participantes.toString()}
                      onChange={formik.handleChange}
                      isInvalid={formik.errors.cant_participantes !== undefined}
                      errorMessage={formik.errors.cant_participantes}
                      placeholder="Ingresa el numero de participantes"
                      variant="bordered"
                      type="text"
                    />

                    <Input
                      id={`cant_participantes_${contest?.id || ""}`}
                      label="Cantidad de integrantes por equipo"
                      name="cant_integrantes_por_equipo"
                      value={formik.values.cant_integrantes_por_equipo.toString()}
                      onChange={formik.handleChange}
                      isInvalid={
                        formik.errors.cant_integrantes_por_equipo !== undefined
                      }
                      errorMessage={formik.errors.cant_integrantes_por_equipo}
                      placeholder="Ingresa la cantidad de integrantes por equipo"
                      variant="bordered"
                      type="text"
                    />
                  </div>

                  <div
                    className={`flex 
                  ${
                    formik.errors.cant_integrantes_por_equipo !== undefined ||
                    formik.errors.cant_participantes !== undefined
                      ? "py-0"
                      : "py-3"
                  } justify-between gap-9 md:gap-2 flex-col md:flex-row`}
                  >
                    <DateInput
                      value={fecha}
                      onChange={(date) => {
                        setFecha(date);
                      }}
                      label="Fecha Inicio"
                      className="w-full"
                      isInvalid={formik.errors.fecha_inicio !== undefined}
                      errorMessage={formik.errors.fecha_inicio}
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

                    <DateInput
                      value={fechaFinal}
                      onChange={(date) => {
                        setFechaFinal(date);
                      }}
                      label="Fecha Final"
                      className="w-full"
                      isInvalid={formik.errors.fecha_fin !== undefined}
                      errorMessage={formik.errors.fecha_fin}
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
