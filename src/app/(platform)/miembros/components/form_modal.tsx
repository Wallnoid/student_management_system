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

import { memberSchema, mappeoCarreras, mappeoSemestres, mappeoRoles, actualDate, Carreras, Semestres, Roles, } from "../../../../utils/member_schema";
import { DateValue, parseDate, getLocalTimeZone } from "@internationalized/date";



type Inputs = typeof Input;

export default function FormModal() {

  const currentDate: string =
    `${actualDate.getFullYear()}-${(actualDate.getMonth() + 1).toString().padStart(2, '0')}-${actualDate.getDate().toString().padStart(2, '0')}`

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [errors, setErrors] = useState({});
  const [fecha, setFecha] = React.useState<DateValue>(parseDate(currentDate));



  const asignFechaNacimiento = () => {

    const fechaAsDate = new Date(fecha.year, fecha.month - 1, fecha.day);

    //setValue("fechaNacimiento", fechaAsDate);
  };

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
              <form >
                <ModalBody>
                  <Input

                    autoFocus
                    label="Cedula"
                    placeholder="Ingresa tu cedula"
                    variant="bordered"
                    type="text"
                  // isInvalid={errors.cedula?.type !== undefined}
                  // errorMessage={errors.cedula?.message}
                  // {...register("cedula",)}
                  />

                  <div className={`flex ${errors !== undefined ? 'py-0' : 'py-3'}  justify-between`}>
                    <Input
                      label="Nombre"
                      placeholder="Ingresa tu nombre"
                      variant="bordered"
                      className="w-full sm:w-1/2 mx-1"
                      type="text"
                    // isInvalid={errors !== undefined}
                    // errorMessage={errors}
                    // {...register("nombre")}
                    />
                    <Input
                      label="Apellido"
                      placeholder="Ingresa tu apellido"
                      variant="bordered"
                      className="w-full sm:w-1/2"
                      type="text"
                    // isInvalid={errors.apellido?.type !== undefined}
                    // errorMessage={errors.apellido?.message}
                    // {...register("apellido")}
                    />
                  </div>

                  <Input
                    label="Telefono"
                    placeholder="Ingresa tu telefono"
                    className={errors !== undefined || errors !== undefined ? 'py-0' : 'py-3'}
                    variant="bordered"
                    type="text"
                  // isInvalid={errors.telefono?.type !== undefined}
                  // errorMessage={errors.telefono?.message}
                  // {...register("telefono")}
                  />
                  <Input
                    label="Correo"
                    placeholder="Ingresa tu correo"
                    className={errors !== undefined ? 'py-0' : 'py-3'}
                    variant="bordered"
                    type="email"
                  // isInvalid={errors.correo?.type !== undefined}
                  // errorMessage={errors.correo?.message}
                  // {...register("correo")}
                  />

                  <div className={`flex 
                  ${errors !== undefined || errors !== undefined ? 'py-0' : 'py-3'} justify-between`}>
                    <DefaultSelect<{ [key in Carreras]: string }>
                      datas={mappeoCarreras}
                      label="Carrera"
                      isInvalid={false}
                      errorMessage={""}
                      validate={{}}
                    // isInvalid={errors.carrera?.type !== undefined}
                    // errorMessage={errors.carrera?.message}
                    // validate={register("carrera")}
                    ></DefaultSelect>
                    <div className=" w-2"></div>
                    <DefaultSelect<{ [key in Semestres]: string }>
                      datas={mappeoSemestres}
                      label="Semestre"
                      isInvalid={false}
                      errorMessage={""}
                      validate={{}}
                    // isInvalid={errors.semestre?.type !== undefined}
                    // errorMessage={errors.semestre?.message}
                    // validate={register("semestre")}
                    ></DefaultSelect>
                  </div>

                  <div className={`flex 
                  ${errors !== undefined || errors !== undefined ? 'py-0' : 'py-3'} justify-between`}>

                    <DatePicker
                      value={fecha}
                      onChange={(date) => {
                        setFecha(date);

                      }}
                      label="Fecha Nacimiento"
                      showMonthAndYearPickers
                      className="max-w-[284px]"
                    // isInvalid={errors.fechaNacimiento?.type !== undefined}
                    // errorMessage={errors.fechaNacimiento?.message}


                    />

                    <div className=" w-2"></div>
                    <SelectIcon <{ [key in Roles]: string }>
                      label="Rol"
                      datas={mappeoRoles}
                      isInvalid={false}
                      errorMessage={""}
                      validate={{}}

                    // isInvalid={errors.rol?.type !== undefined}
                    // errorMessage={errors.rol?.message}
                    // validate={register("rol")}
                    ></SelectIcon>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit" onPress={asignFechaNacimiento}>
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
