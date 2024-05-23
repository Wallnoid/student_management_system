import React, { useState, useEffect, ReactElement } from "react";
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
  AutocompleteItem,
} from "@nextui-org/react";
import { PlusIcon } from "../../../../components/shared/icons";

import { projectSchema, actualDate } from "../../../../schemas/project_schema";
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
  getClubesAsignacionProyectos,
  ingresarProyecto,
} from "@/services/proyectos.service";
import { ClubInternos } from "@/interfaces/ClubInternos";

export type Presidente = {
  nombre: string;
  apellido: string;
};

export type Clubes = {
  id: string;
  nombre: string;
  presidente: Presidente;
};

export default function FormModal({
  proyect: project,
  icon,
}: {
  proyect?: Proyecto;
  icon?: JSX.Element;
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
    parseDate(project?.fecha_inicio || currentDate)
  );
  const [fechaFinal, setFechaFinal] = useState<DateValue>(
    parseDate(project?.fecha_fin || finalDate)
  );

  const [clubElements, setClubElements] = useState<ReactElement[]>([]);

  const createObject = (data: Clubes): ReactElement => {
    return (
      <AutocompleteItem key={data.id} textValue={data.nombre}>
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{data.nombre}</p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {data.presidente.nombre + " " + data.presidente.apellido}
          </p>
        </div>
      </AutocompleteItem>
    );
  };

  const onChanges = (value: string) => {
    formik.setFieldValue("responsable", value);
  };

  const formik = useFormik({
    initialValues: {
      nombre: project?.nombre || "",
      descripcion: project?.descripcion || "",
      fechaInicio: project?.fecha_inicio || "",
      fechaFinal: project?.fecha_fin || "",
      fechaValida: project?.fecha_inicio || currentDate,
      responsable: (project?.responsable as ClubInternos)?.id || "",
    },
    validationSchema: projectSchema(),
    onSubmit: (values) => {
      //AQUI HAY UN ERROR
      console.log(values);
      const proyectLocal: Proyecto = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        fecha_inicio: values.fechaInicio,
        fecha_fin: values.fechaFinal,
        estado: "activo",
        creado_por: currentUser!.user.id,
        actualizado_por: currentUser!.user.id,
        responsable: values.responsable,
      };

      // if (project) {
      //   proyectLocal.id = project.id;

      //   toast.promise(
      //     actualizarProyecto(proyectLocal?.id || "", proyectLocal),
      //     {
      //       loading: "Saving...",
      //       success: () => {
      //         formik.resetForm();
      //         //onClose();
      //         //onReload!(true);
      //         window.location.reload();

      //         return <b>Proyecto Actualizado!</b>;
      //       },
      //       error: (err) => {
      //         formik.setSubmitting(false);
      //         return `${err.message.toString()}`;
      //       },
      //     }
      //   );

      //   return;
      // } else {
      //   toast.promise(ingresarProyecto(proyectLocal), {
      //     loading: "Saving...",
      //     success: () => {
      //       formik.resetForm();

      //       window.location.reload();

      //       return <b>Proyecto Guardado!</b>;
      //     },
      //     error: (err) => {
      //       formik.setSubmitting(false);

      //       return `${err.message.toString()}`;
      //     },
      //   });
      // }
    },
  });

  useEffect(() => {
    getClubesAsignacionProyectos()
      .then((data) => {
        const elements = data.map((club: Clubes) => createObject(club));

        setClubElements(elements);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const asignFechas = () => {
    console.log(typeof fecha);
    const fechaAsDate = new Date(fecha.year, fecha.month - 1, fecha.day);
    const fechaFinalAsDate = new Date(
      fechaFinal.year,
      fechaFinal.month - 1,
      fechaFinal.day
    );

    const fechaValida = new Date(formik.values.fechaValida);

    console.log(fechaAsDate);
    console.log(fechaFinalAsDate);

    console.log(fechaValida);

    formik.setFieldValue("fechaInicio", fechaAsDate);
    formik.setFieldValue("fechaFinal", fechaFinalAsDate);
  };

  return (
    <>
      <Toaster />
      {!project ? (
        <Button
          color="primary"
          endContent={<PlusIcon />}
          onPress={onOpen}
          id="AddMemberButton"
        >
          Agregar proyecto
        </Button>
      ) : (
        <Tooltip content="Editar Proyecto">
          <span
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={onOpen}
          >
            {icon}
          </span>
        </Tooltip>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar proyecto
              </ModalHeader>
              <form onSubmit={formik.handleSubmit}>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Nombre"
                    name="nombre"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.nombre !== undefined}
                    errorMessage={formik.errors.nombre}
                    placeholder="Ingresa el nombre del proyecto"
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
                    elements={clubElements}
                    name="responsable"
                    value={formik.values.responsable.toString()} // Convert the value to a string
                    onChange={onChanges}
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
