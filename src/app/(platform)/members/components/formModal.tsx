import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DatePicker,
} from "@nextui-org/react";
import { ChevronDownIcon, PlusIcon } from "./icons";
import { capitalize } from "../utils/utils";
import DefaultDropdown from "./select";
import DefaultSelect from "./select";
import SelectIcon from "./selectIcon";

export default function FormModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [carrera, setCarrera] = useState("");
  const [semestre, setSemestre] = useState("");

  const carreras = [
    { label: "Software", key: "software", value: "software" },
    { label: "Industrial", key: "industrial", value: "industrial" },
    {
      label: "Telecomunicaciones",
      key: "telecomunicaciones",
      value: "telecomunicaciones",
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
              <ModalBody>
                <Input
                  autoFocus
                  label="Cedula"
                  placeholder="Ingresa tu cedula"
                  variant="bordered"
                  type="text"
                />

                <div className="flex py-2  justify-between">
                  <Input
                    label="Nombre"
                    placeholder="Ingresa tu nombre"
                    variant="bordered"
                    className="w-full sm:w-1/2 mx-1"
                    type="text"
                  />
                  <Input
                    label="Apellido"
                    placeholder="Ingresa tu apellido"
                    variant="bordered"
                    className="w-full sm:w-1/2"
                    type="text"
                  />
                </div>

                <Input
                  label="Telefono"
                  placeholder="Ingresa tu telefono"
                  variant="bordered"
                  type="text"
                />
                <Input
                  label="Correo"
                  placeholder="Ingresa tu correo"
                  variant="bordered"
                  type="email"
                />

                <div className="flex py-2 justify-between">
                  <DefaultSelect
                    datas={carreras}
                    label="Carrera"
                  ></DefaultSelect>
                  <div className=" w-2"></div>
                  <DefaultSelect
                    datas={semestres}
                    label="Semestre"
                  ></DefaultSelect>
                </div>

                <div className="flex py-2 justify-between">
                  <DatePicker label="Fecha Regitro" className="max-w-[284px]" />
                  <div className=" w-2"></div>
                  <SelectIcon label="Rol" datas={roles}></SelectIcon>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
