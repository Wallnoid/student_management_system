import React from "react";
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
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";

import {
  memberSchema,
  mappeoCarreras,
  mappeoSemestres,
  mappeoRoles,
  actualDate,
  Carreras,
  Semestres,
  Roles,
} from "../../../../schemas/member_schema";
import { DateValue, parseDate } from "@internationalized/date";
import {
  currentUser,
  registerUser,
  updateRole,
  updateUser,
} from "@/services/users.service";
import { Member } from "@/interfaces/Member";
import InfoMembers from "./info_member";

export default function FormModal({
  member,
  onReload,
  icon: button,
}: {
  member?: Member;
  onReload?: Function;
  icon?: JSX.Element;
}) {
  const currentDate: string = `${actualDate.getFullYear()}-${(
    actualDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${actualDate.getDate().toString().padStart(2, "0")}`;

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [fecha, setFecha] = React.useState<DateValue>(
    parseDate(member?.fecha_nacimiento || currentDate)
  );

  const formik = useFormik({
    initialValues: {
      cedula: member?.nro_identificacion || "",
      nombre: member?.nombre || "",
      apellido: member?.apellido || "",
      telefono: member?.telefono || "",
      correo: member?.correo || "",
      carrera: member?.carrera || "",
      semestre: member?.semestre || "",
      fechaNacimiento: member?.fecha_nacimiento || "",
      rol: member?.categoria || "",
    },
    validationSchema: memberSchema,
    onSubmit: (values) => {
      console.log(values);

      const memberLocal: Member = {
        nombre: values.nombre,
        apellido: values.apellido,
        fecha_nacimiento: values.fechaNacimiento,
        nro_identificacion: values.cedula,
        correo: values.correo,
        carrera: values.carrera,
        semestre: values.semestre,
        estado: "activo",
        telefono: values.telefono,
        categoria: values.rol,
        creado_por: currentUser!.user.id,
      };

      if (member) {
        console.log("Actualizando miembro");
        memberLocal.id = member.id;

        toast.promise(updateRole(memberLocal, memberLocal!.id || ""), {
          loading: "Saving...",
          success: () => {
            console.log("Miembro actualizado!");
            formik.resetForm();
            //onClose();
            //onReload!(true);
            window.location.reload();

            return <b>Miembro actualizado!</b>;
          },
          error: (err) => {
            formik.setSubmitting(false);
            return `${err.message.toString()}`;
          },
        });

        return;
      } else {
        console.log("Registrando miembro");
        toast.promise(registerUser(memberLocal), {
          loading: "Saving...",
          success: () => {
            console.log("Miembro guardado!");
            formik.resetForm();
            //onClose();
            //onReload!(true);
            window.location.reload();

            return <b>Miembro guardado!</b>;
          },
          error: (err) => {
            formik.setSubmitting(false);
            console.log(err);
            return `${err.message.toString()}`;
          },
        });
      }
    },
  });

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
        <Tooltip content="Edit user">
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
                Agregar miembro
              </ModalHeader>

              <form onSubmit={formik.handleSubmit}>
                <ModalBody>
                  <Input
                    autoFocus
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

                  <Input
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

                  <div
                    className={`flex 
                  ${
                    formik.errors.correo !== undefined ? "py-0" : "py-3"
                  } justify-between`}
                  >
                    <DefaultSelect<{ [key in Carreras]: string }>
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
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    onPress={asignFechaNacimiento}
                    isLoading={formik.isSubmitting}
                  >
                    Registrar
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
