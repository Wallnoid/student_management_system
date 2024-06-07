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

import { PlusIcon } from "../../../../components/shared/icons";
import DefaultSelect from "../../../../components/shared/select";
import SelectIcon from "../../../../components/shared/selectIcon";
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
import dateHook from "../hooks/date_hook";
import { optionsElements, statusColorMap } from "../constants/constants";
import FormikMember from "../constants/formik";
import { actualDate } from "@/constants/date_constants";

export default function FormModal({
  member,
  icon: button,
}: {
  member?: Member;
  icon?: JSX.Element;
}) {
  const { fecha, setFecha } = dateHook(actualDate, member);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onChanges = (value: string) => {
    formik.setFieldValue("estado", value);
  };

  const formik = FormikMember(member, currentUser);

  const asignFechaNacimiento = () => {
    const fechaAsDate = new Date(fecha.year, fecha.month - 1, fecha.day);

    formik.setFieldValue("fechaNacimiento", fechaAsDate);
  };

  return (
    <>
      <Toaster />
      {!member ? (
        <Button
          color="primary"
          endContent={<PlusIcon />}
          onPress={onOpen}
          id="AddMemberButton"
        >
          Agregar miembro
        </Button>
      ) : (
        <Tooltip content="Editar Miembro">
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
                {member ? (
                  <div className="flex flex-row items-center">
                    <div className="w-1/2">{"Actualizar miembro"}</div>

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
                  "Ingresar Miembro"
                )}
              </ModalHeader>

              <form onSubmit={formik.handleSubmit}>
                <ModalBody>
                  {member ? (
                    <Input
                      isDisabled
                      id={`correo_disable_${member?.id || ""}`}
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
                    id={`cedula_${member?.id || ""}`}
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
                      id={`nombre_${member?.id || ""}`}
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
                      id={`apellido_${member?.id || ""}`}
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
                    id={`telefono_${member?.id || ""}`}
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

                  {!member ? (
                    <Input
                      id={`correo_${member?.id || ""}`}
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

                  <div
                    className={`flex 
                  ${
                    formik.errors.correo !== undefined ? "py-0" : "py-3"
                  } justify-between`}
                  >
                    <DefaultSelect<{ [key in Carreras]: string }>
                      id={`carrera_${member?.id || ""}`}
                      datas={mappeoCarreras}
                      name="carrera"
                      value={formik.values.carrera}
                      onChange={formik.handleChange}
                      errorMessage={formik.errors.carrera}
                      isInvalid={formik.errors.carrera !== undefined}
                      label="Carrera"
                    ></DefaultSelect>
                    <div className=" w-2"></div>
                    <DefaultSelect<{ [key in Semestres]: string }>
                      id={`semestre_${member?.id || ""}`}
                      datas={mappeoSemestres}
                      name="semestre"
                      value={formik.values.semestre}
                      onChange={formik.handleChange}
                      errorMessage={formik.errors.semestre}
                      isInvalid={formik.errors.semestre !== undefined}
                      label="Semestre"
                    ></DefaultSelect>
                  </div>

                  <div
                    className={`flex 
                  ${
                    formik.errors.carrera !== undefined ||
                    formik.errors.semestre !== undefined
                      ? "py-0"
                      : "py-3"
                  } justify-between`}
                  >
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

                    <div className=" w-2"></div>
                    <SelectIcon<{ [key in Roles]: string }>
                      id={`rol_${member?.id || ""}`}
                      label="Rol"
                      datas={mappeoRoles}
                      name="rol"
                      value={formik.values.rol}
                      onChange={formik.handleChange}
                      errorMessage={formik.errors.rol}
                      isInvalid={formik.errors.rol !== undefined}
                    ></SelectIcon>
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
                    onPress={asignFechaNacimiento}
                    isLoading={formik.isSubmitting}
                  >
                    {member ? "Actualizar" : "Registrar"}
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
