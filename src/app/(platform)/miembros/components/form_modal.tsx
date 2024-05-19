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
import { PlusIcon } from "./icons";
import DefaultSelect from "./select";
import SelectIcon from "./selectIcon";
import { useForm, SubmitHandler } from "react-hook-form";

import { memberSchema } from "../utils/member_schema";
import { zodResolver } from "@hookform/resolvers/zod";


type Inputs = typeof Input;

export default function FormModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();



  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(memberSchema),
  });

  const onSubmit: SubmitHandler<{
    cedula: string;
    nombre: string;
    apellido: string;
    telefono: number;
    correo: string;
    carrera: string;
    semestre: string;
    fechaNacimiento: Date;
    rol: string;
  }> = (data) => {
    console.log(data);
  };
  const carreras = [
    { label: "Software", key: "software", value: "software" },
    { label: "Industrial", key: "industrial", value: "industrial" },
    {
      label: "Telecomunicaciones",
      key: "telecomunicaciones",
      value: "telecomunicaciones"
    },
    { label: "no_se_mas", key: "no_se_mas", value: "no_se_mas" },
  ];
  const semestres = [
    { label: "primero", key: "primero", value: "primero" },
    { label: "segundo", key: "segundo", value: "segundo" },
    { label: "tercero", key: "tercero", value: "tercero" },
    { label: "cuarto", key: "cuarto", value: "cuarto" },
    { label: "quinto", key: "quinto", value: "quinto" },
    { label: "sexto", key: "sexto", value: "sexto" },
    { label: "septimo", key: "septimo", value: "septimo" },
    { label: "octavo", key: "octavo", value: "octavo" },
    { label: "noveno", key: "noveno", value: "noveno" },
    { label: "decimo", key: "decimo", value: "decimo" },
  ];



  const roles = [
    { label: "Admin", key: "admin", value: "admin" },
    { label: "User", key: "user", value: "user" },
  ];

  return (
    <>
      <Button color="primary" endContent={<PlusIcon />} onPress={onOpen}>
        Agregar miembro
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar miembro
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Input

                    autoFocus
                    label="Cedula"
                    placeholder="Ingresa tu cedula"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.cedula?.type !== undefined}
                    errorMessage={errors.cedula?.message}
                    {...register("cedula",)}
                  />

                  <div className={`flex ${errors.cedula?.type !== undefined ? 'py-0' : 'py-3'}  justify-between`}>
                    <Input
                      label="Nombre"
                      placeholder="Ingresa tu nombre"
                      variant="bordered"
                      className="w-full sm:w-1/2 mx-1"
                      type="text"
                      isInvalid={errors.nombre?.type !== undefined}
                      errorMessage={errors.nombre?.message}
                      {...register("nombre")}
                    />
                    <Input
                      label="Apellido"
                      placeholder="Ingresa tu apellido"
                      variant="bordered"
                      className="w-full sm:w-1/2"
                      type="text"
                      isInvalid={errors.apellido?.type !== undefined}
                      errorMessage={errors.apellido?.message}
                      {...register("apellido")}
                    />
                  </div>

                  <Input
                    label="Telefono"
                    placeholder="Ingresa tu telefono"
                    className={errors.nombre?.type !== undefined || errors.apellido?.type !== undefined ? 'py-0' : 'py-3'}
                    variant="bordered"
                    type="text"
                    isInvalid={errors.telefono?.type !== undefined}
                    errorMessage={errors.telefono?.message}
                    {...register("telefono")}
                  />
                  <Input
                    label="Correo"
                    placeholder="Ingresa tu correo"
                    className={errors.telefono?.type !== undefined ? 'py-0' : 'py-3'}
                    variant="bordered"
                    type="email"
                    isInvalid={errors.correo?.type !== undefined}
                    errorMessage={errors.correo?.message}
                    {...register("correo")}
                  />

                  <div className={`flex 
                  ${errors.nombre?.type !== undefined || errors.apellido?.type !== undefined ? 'py-0' : 'py-3'} justify-between`}>
                    <DefaultSelect
                      datas={carreras}
                      label="Carrera"
                      isInvalid={errors.carrera?.type !== undefined}
                      errorMessage={errors.carrera?.message}
                      validate={register("carrera")}
                    ></DefaultSelect>
                    <div className=" w-2"></div>
                    <DefaultSelect
                      datas={semestres}
                      label="Semestre"
                      isInvalid={errors.semestre?.type !== undefined}
                      errorMessage={errors.semestre?.message}
                      validate={register("semestre")}
                    ></DefaultSelect>
                  </div>

                  <div className={`flex 
                  ${errors.carrera?.type !== undefined || errors.semestre?.type !== undefined ? 'py-0' : 'py-3'} justify-between`}>
                    <DatePicker
                      label="Fecha Nacimiento"
                      showMonthAndYearPickers
                      className="max-w-[284px]"
                      isInvalid={errors.fechaNacimiento?.type !== undefined}
                      errorMessage={errors.fechaNacimiento?.message}
                      {...register("fechaNacimiento")}
                    />
                    <div className=" w-2"></div>
                    <SelectIcon
                      label="Rol"
                      datas={roles}
                      isInvalid={errors.rol?.type !== undefined}
                      errorMessage={errors.rol?.message}
                      validate={register("rol")}
                    ></SelectIcon>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
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
