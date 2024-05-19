import React, { useState } from "react";
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
} from "@nextui-org/react";

import { PlusIcon } from "../../../../components/shared/icons";
import DefaultSelect from "../../../../components/shared/select";
import SelectIcon from "../../../../components/shared/selectIcon";
import { useFormik } from "formik";

import {
  memberSchema,
  mappeoCarreras,
  mappeoSemestres,
  mappeoRoles,
  actualDate,
  Carreras,
  Semestres,
  Roles,
} from "../../../../utils/member_schema";
import { DateValue, parseDate } from "@internationalized/date";

export default function FormModal() {
  const currentDate: string = `${actualDate.getFullYear()}-${(
    actualDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${actualDate.getDate().toString().padStart(2, "0")}`;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [fecha, setFecha] = React.useState<DateValue>(parseDate(currentDate));

  const formik = useFormik({
    initialValues: {
      cedula: "",
      nombre: "",
      apellido: "",
      telefono: "",
      correo: "",
      carrera: "",
      semestre: "",
      fechaNacimiento: "",
      rol: "",
    },
    validationSchema: memberSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const asignFechaNacimiento = () => {
    const fechaAsDate = new Date(fecha.year, fecha.month - 1, fecha.day);

    formik.setFieldValue("fechaNacimiento", fechaAsDate);

    //setValue("fechaNacimiento", fechaAsDate);
  };

  return (
    <>
      <Button
        color="primary"
        endContent={<PlusIcon />}
        onPress={onOpen}
        id="AddMemberButton"
      >
        Agregar miembro
      </Button>
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
