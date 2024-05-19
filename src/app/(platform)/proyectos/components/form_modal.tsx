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
} from "@nextui-org/react";
import { PlusIcon } from "../../../../components/shared/icons";

import { proyectSchema, actualDate } from "../../../../utils/proyect_schema";
import {
  DateValue,
  parseDate,
  getLocalTimeZone,
} from "@internationalized/date";
import { useFormik } from "formik";

export default function FormModal() {
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
  const [fecha, setFecha] = useState<DateValue>(parseDate(currentDate));
  const [fechaFinal, setFechaFinal] = useState<DateValue>(parseDate(finalDate));

  const [errors, setErrors] = useState({});

  const formik = useFormik({
    initialValues: {
      nombre: "",
      descripcion: "",
      fechaInicio: "",
      fechaFinal: "",
    },
    validationSchema: proyectSchema,
    onSubmit: (values) => {
      console.log(values);
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
      <Button color="primary" endContent={<PlusIcon />} onPress={onOpen}>
        Agregar proyecto
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar proyecto
              </ModalHeader>
              <form>
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
                    ${errors !== undefined ? "py-0" : "py-3"} 
                    justify-between`}
                    variant="bordered"
                    maxRows={3}
                    // isInvalid={errors.descripcion?.type !== undefined}
                    // errorMessage={errors.descripcion?.message}
                    // {...register("descripcion")}
                  />

                  <div
                    className={`flex 
                  ${
                    errors !== undefined || errors !== undefined
                      ? "py-0"
                      : "py-3"
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
