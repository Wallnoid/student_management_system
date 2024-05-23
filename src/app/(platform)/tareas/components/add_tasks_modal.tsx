import React, { use, useEffect, useState } from "react";
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
  Textarea,
  Tooltip,
  user,
} from "@nextui-org/react";
import { PlusIcon } from "../../../../components/shared/icons";

import {
  DateValue,
  parseDate,
  getLocalTimeZone,
} from "@internationalized/date";
import { useFormik } from "formik";
import InputSearch from "@/components/shared/input_search";
import { Proyecto } from "@/interfaces/Proyecto";
import toast, { Toaster } from "react-hot-toast";
import { currentUser } from "@/services/users.service";
import {
  actualizarProyecto,
  ingresarProyecto,
} from "@/services/proyectos.service";
import { Task } from "@/interfaces/Task";
import { insertTasksAndAssignments } from "@/services/task.service";
import SelectUsers from "./selectUsers";
import { Member } from "@/interfaces/Member";
import { getMembers } from "@/services/members.service";
import { getMembersClub } from "@/services/clubes.service";
import { ClubInternos } from "@/interfaces/ClubInternos";
import { actualDate, projectSchema } from "@/schemas/project_schema";



export default function AddTaskModal({
  proyect,
  icon,
  members,
}: {
  proyect?: Proyecto;
  icon?: JSX.Element;
  members?: Member[];
}) {
  const currentDate: string = `${actualDate.getFullYear()}-${(
    actualDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${actualDate.getDate().toString().padStart(2, "0")}`;

  const finalDate: string = `${actualDate.getFullYear()}-${(
    actualDate.getMonth() + 2
  )
    .toString()
    .padStart(2, "0")}-${actualDate.getDate().toString().padStart(2, "0")}`;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fecha, setFecha] = useState<DateValue>(
    parseDate(proyect?.fecha_inicio || currentDate)
  );
  const [fechaFinal, setFechaFinal] = useState<DateValue>(
    parseDate(proyect?.fecha_fin || finalDate)
  );

  const formik = useFormik({
    initialValues: {
      nombre: proyect?.nombre || "",
      descripcion: proyect?.descripcion || "",
      fechaInicio: proyect?.fecha_inicio || "",
      fechaFinal: proyect?.fecha_fin || "",
      user: proyect?.responsable || "",
    },
    //validationSchema: projectSchema,
    onSubmit: (values) => {
      console.log(values);
      const task: Task = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        fecha_inicio: values.fechaInicio,
        fecha_fin: values.fechaFinal,
        creado_por: currentUser!.user.id,
        proyecto: proyect?.id || "",
        responsables: [values.user as string], //cambiar por el sele
        comentario: ""
      };
      toast.promise(
        insertTasksAndAssignments(task),
        {
          loading: "Saving...",
          success: () => {
            console.log("Tarea agregada al proyecto!");
            formik.resetForm();
            //onClose();
            //onReload!(true);
            //window.location.reload();

            return <b>Tarea Agregada</b>;
          },
          error: (err) => {
            formik.setSubmitting(false);
            return `${err.message.toString()}`;
          },
        }
      );
    },
  });

  const asignFechas = () => {
    const fechaAsDate = new Date(fecha.year, fecha.month - 1, fecha.day);
    const fechaFinalAsDate = new Date(
      fechaFinal.year,
      fechaFinal.month - 1,
      fechaFinal.day
    );
    formik.setFieldValue("fechaInicio", fechaAsDate);
    formik.setFieldValue("fechaFinal", fechaFinalAsDate);
  };

  const [selectedUser, setSelectedUser] = useState<Member | null>(null);
  const [users, setUsers] = useState<Member[]>([]);



  const handleUserSelection = (user: Member) => {
    setSelectedUser(user);
    console.log("Este ususario jeje:", user);
  };

  useEffect(() => {
    
    getMembersClub('cb2c22b1-2e65-4dd7-bb69-2fd21c3ff081').then((members) => {
      setUsers(members);
      console.log("Miembros del club", users);
    }).catch((error) => {
      console.error("Error al obtener los miembros del club:", error);
    });
  }, [proyect]);


  const onChanges = (value: string) => {
    console.log(value);
    formik.setFieldValue("user", value);
  };


  return (
    <>
      <Toaster />
      <Button
        color="primary"
        endContent={<PlusIcon />}
        onPress={onOpen}
        id="AddMemberButton"
      >
        Agregar Tarea
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar tarea a: {proyect?.nombre}
              </ModalHeader>
              <form onSubmit={formik.handleSubmit}>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Nombre"
                    name="nombre"
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.nombre !== undefined}
                    errorMessage={formik.errors.nombre}
                    placeholder="Ingresa el nombre de la tarea"
                    variant="bordered"
                    type="text"
                  />

                  <Textarea
                    label="Descripcion"
                    name="descripcion"
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
                  <SelectUsers
                    datas={users}
                    name="usuario"
                    value={formik.values.user.toString()} // Convert the value to a string
                    onChange={onChanges}
                    isInvalid={formik.errors.user !== undefined}
                    className={`flex 
                                        ${formik.errors.nombre !== undefined ? "py-0" : "py-3"} 
                                        justify-between`}
                    errorMessage={formik.errors.user}
                  ></SelectUsers>
                  <div
                    className={`flex 
                  ${formik.errors.descripcion !== undefined ? "py-0" : "py-3"
                      } justify-between`}
                  >
                    <DatePicker
                      value={fecha}
                      onChange={(date) => {
                        setFecha(date);
                      }}
                      label="Fecha Inicio"
                      showMonthAndYearPickers
                      className="max-w-[284px]"
                      isInvalid={formik.errors.fechaInicio !== undefined}
                      errorMessage={formik.errors.fechaInicio}
                    />

                    <div className=" w-2"></div>
                    <DatePicker
                      value={fechaFinal}
                      onChange={(date) => {
                        setFechaFinal(date);
                      }}
                      label="Fecha Final"
                      showMonthAndYearPickers
                      className="max-w-[284px]"
                      isInvalid={formik.errors.fechaFinal !== undefined}
                      errorMessage={formik.errors.fechaFinal}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit" onPress={asignFechas}>
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
