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
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import { PlusIcon } from "../../../../components/shared/icons";

import { proyectSchema, actualDate } from "../../../../schemas/proyect_schema";
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

export default function FormModal({
  proyect,
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
    },
    validationSchema: proyectSchema(
      fecha instanceof Date
        ? fecha
        : new Date(fecha.year, fecha.month - 1, fecha.day),
      fechaFinal instanceof Date
        ? fechaFinal
        : new Date(fechaFinal.year, fechaFinal.month - 1, fechaFinal.day)
    ),
    onSubmit: (values) => {
      console.log(values);
      //AQUI HAY UN ERROR
      const proyectLocal: Proyecto = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        fecha_inicio: values.fechaInicio,
        fecha_fin: values.fechaFinal,
        estado: "activo",
        creado_por: currentUser!.user.id,
        actualizado_por: currentUser!.user.id,
        responsable: "6839840e-5a65-4349-aaa8-8bd0c128d757",
      };

      if (proyect) {
        console.log("Actualizando miembro");
        proyectLocal.id = proyect.id;

        toast.promise(
          actualizarProyecto(proyectLocal?.id || "", proyectLocal),
          {
            loading: "Saving...",
            success: () => {
              console.log("Proyect actualizado!");
              formik.resetForm();
              //onClose();
              //onReload!(true);
              window.location.reload();

              return <b>Proyecto Actualizado!</b>;
            },
            error: (err) => {
              formik.setSubmitting(false);
              return `${err.message.toString()}`;
            },
          }
        );

        return;
      } else {
        console.log("Registrando miembro");
        toast.promise(ingresarProyecto(proyectLocal), {
          loading: "Saving...",
          success: () => {
            console.log("Miembro guardado!");
            formik.resetForm();
            //onClose();
            //onReload!(true);
            window.location.reload();

            return <b>Proyecto Guardado!</b>;
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

  const asignFechas = () => {
    const fechaAsDate = new Date(fecha.year, fecha.month - 1, fecha.day);
    const fechaFinalAsDate = new Date(
      fechaFinal.year,
      fechaFinal.month - 1,
      fechaFinal.day
    );

    console.log(fechaAsDate);
    console.log(fechaFinalAsDate);

    formik.setFieldValue("fechaInicio", fechaAsDate);
    formik.setFieldValue("fechaFinal", fechaFinalAsDate);
  };

  return (
    <>
      <Toaster />
      {!proyect ? (
        <Button
          color="primary"
          endContent={<PlusIcon />}
          onPress={onOpen}
          id="AddMemberButton"
        >
          Agregar proyecto
        </Button>
      ) : (
        <Tooltip content="Edit user">
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
                  {/*<InputSearch></InputSearch>*/}

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
