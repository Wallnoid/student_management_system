import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  DatePicker,
  Tooltip,
} from "@nextui-org/react";

import { Toaster } from "react-hot-toast";

import {
  mappeoCarreras,
  mappeoSemestres,
  mappeoRoles,
  Carreras,
  Semestres,
  Roles,
} from "@/schemas/member_schema";
import { currentUser } from "@/services/users.service";
import { Member } from "@/interfaces/Member";
import InputSearch from "@/components/shared/input_search";
import FormikMember from "../constants/formik";
import { actualDate } from "@/constants/date_constants";
import { optionsElements, statusColorMap } from "@/constants/constants";
import { FiEdit2 } from "react-icons/fi";
import FormikParticipant from "../constants/formik_participant_team";
import { Participant } from "@/interfaces/Participant";
import { PlusIcon } from "@/components/shared/icons";
import { dateInicioHook } from "@/hooks/date_hook";

export default function FormModal({
  participant,
  icon: button,
  id_team,
}: {
  participant?: Participant;
  icon?: JSX.Element;
  id_team: string;
}) {
  const { fecha, setFecha } = dateInicioHook(participant?.fecha_nacimiento);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onChanges = (value: string) => {
    formik.setFieldValue("estado", value);
  };

  const send = () => {
    console.log("id_team", id_team);
    formik.setFieldValue("id_team", id_team);
    asignFechaNacimiento();
  };

  const formik = FormikParticipant(participant, currentUser);

  const asignFechaNacimiento = () => {
    const fechaAsDate = new Date(fecha.year, fecha.month - 1, fecha.day);

    formik.setFieldValue("fechaNacimiento", fechaAsDate);
  };

  return (
    <>
      <Toaster />
      {!participant ? (
        <Button
          color="primary"
          endContent={<PlusIcon />}
          onPress={onOpen}
          id="AddParticipanteButton"
        >
          Agregar participante
        </Button>
      ) : (
        <div className=" p-1 rounded-full shadow-sm hover:bg-slate-100 active:bg-slate-200">
          <FiEdit2 className="w-5 h-4 text-warning " onClick={onOpen}></FiEdit2>
        </div>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {participant ? (
                  <div className="flex flex-row items-center">
                    <div className="w-1/2">{"Actualizar Participante"}</div>

                    <div className="w-1/2 mx-5">
                      <InputSearch
                        label=""
                        placeholder=""
                        elements={optionsElements}
                        name="estado"
                        onChange={onChanges}
                        value={formik.values.estado}
                        color={statusColorMap[formik.values.estado]}
                      ></InputSearch>
                    </div>
                  </div>
                ) : (
                  "Ingresar Participante"
                )}
              </ModalHeader>

              <form onSubmit={formik.handleSubmit}>
                <ModalBody>
                  {participant ? (
                    <Input
                      isDisabled
                      id={`correo_disable_${participant?.id || ""}`}
                      label="Correo"
                      name="correo"
                      value={formik.values.correo}
                      placeholder="Ingresa tu correo"
                      variant="bordered"
                      type="email"
                    />
                  ) : null}
                  <Input
                    autoFocus
                    id={`cedula_${participant?.id || ""}`}
                    label="Cedula"
                    name="cedula"
                    value={formik.values.cedula}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.cedula !== undefined}
                    errorMessage={formik.errors.cedula}
                    placeholder="Ingresa tu cedula"
                    variant="bordered"
                    type="text"
                  />

                  <div
                    className={`flex ${
                      formik.errors.cedula !== undefined ? "py-0" : "py-3"
                    }  justify-between`}
                  >
                    <Input
                      id={`nombre_${participant?.id || ""}`}
                      label="Nombre"
                      name="nombre"
                      value={formik.values.nombre}
                      onChange={formik.handleChange}
                      isInvalid={formik.errors.nombre !== undefined}
                      errorMessage={formik.errors.nombre}
                      placeholder="Ingresa tu nombre"
                      variant="bordered"
                      className="w-full sm:w-1/2 mx-1"
                      type="text"
                    />
                    <Input
                      id={`apellido_${participant?.id || ""}`}
                      label="Apellido"
                      name="apellido"
                      value={formik.values.apellido}
                      onChange={formik.handleChange}
                      isInvalid={formik.errors.apellido !== undefined}
                      errorMessage={formik.errors.apellido}
                      placeholder="Ingresa tu apellido"
                      variant="bordered"
                      className="w-full sm:w-1/2"
                      type="text"
                    />
                  </div>

                  <Input
                    id={`telefono_${participant?.id || ""}`}
                    label="Telefono"
                    name="telefono"
                    value={formik.values.telefono}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.telefono !== undefined}
                    errorMessage={formik.errors.telefono}
                    placeholder="Ingresa tu telefono"
                    className={
                      formik.errors.nombre !== undefined ||
                      formik.errors.apellido !== undefined
                        ? "py-0"
                        : "py-3"
                    }
                    variant="bordered"
                    type="text"
                  />

                  {!participant ? (
                    <Input
                      id={`correo_${participant?.id || ""}`}
                      label="Correo"
                      name="correo"
                      value={formik.values.correo}
                      onChange={formik.handleChange}
                      isInvalid={formik.errors.correo !== undefined}
                      errorMessage={formik.errors.correo}
                      placeholder="Ingresa tu correo"
                      className={
                        formik.errors.telefono !== undefined ? "py-0" : "py-3"
                      }
                      variant="bordered"
                      type="email"
                    />
                  ) : null}

                  <DatePicker
                    id="fechaNacimiento"
                    value={fecha}
                    onChange={setFecha}
                    isInvalid={formik.errors.fechaNacimiento !== undefined}
                    errorMessage={formik.errors.fechaNacimiento}
                    label="Fecha Nacimiento"
                    showMonthAndYearPickers
                    className="max-w-[284px]"
                  />
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
                    onPress={send}
                    isLoading={formik.isSubmitting}
                  >
                    {participant ? "Actualizar" : "Registrar"}
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
