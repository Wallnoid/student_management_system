import React from "react";
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
} from "@nextui-org/react";
import { ChevronDownIcon, PlusIcon } from "./icons";
import { capitalize } from "../utils/utils";
import DefaultDropdown from "./dropdown";

export default function FormModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Carreras"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const carreras = [
    { name: "Software", key: "software" },
    { name: "Industrial", key: "industrial" },
    { name: "Telecomunicaciones", key: "telecomunicaciones" },
    { name: "no_se_mas", key: "no_se_mas" },
  ];

  const semestre = [
    { name: "primero", value: 1 },
    { name: "segundo", value: 2 },
    { name: "tercero", value: 3 },
    { name: "cuarto", value: 4 },
    { name: "quinto", value: 5 },
    { name: "sexto", value: 6 },
    { name: "septimo", value: 7 },
    { name: "octavo", value: 8 },
    { name: "noveno", value: 9 },
    { name: "decimo", value: 10 },
  ];

  const handleDropdownSelectionChange = (keys: Set<string>) => {
    setSelectedKeys(keys);
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
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Cedula"
                  placeholder="Ingrea tu cedula"
                  variant="bordered"
                  type="text"
                />

                <div className="flex py-2  justify-between">
                  <Input
                    autoFocus
                    label="Nombre"
                    placeholder="Ingresa tu nombre"
                    variant="bordered"
                    className="w-full sm:w-1/2 mx-1"
                    type="text"
                  />
                  <Input
                    autoFocus
                    label="Apellido"
                    placeholder="Ingresa tu apellido"
                    variant="bordered"
                    className="w-full sm:w-1/2"
                    type="text"
                  />
                </div>

                <Input
                  autoFocus
                  label="Telefono"
                  placeholder="Ingresa tu telefono"
                  variant="bordered"
                  type="text"
                />
                <Input
                  autoFocus
                  label="Correo"
                  placeholder="Ingresa tu correo"
                  variant="bordered"
                  type="email"
                />

                <div className="flex py-2 justify-between">
                  <DefaultDropdown
                    selectedValue={selectedValue}
                    selectedKeys={selectedKeys}
                    handleDropdownSelectionChange={
                      handleDropdownSelectionChange
                    }
                    opciones={carreras}
                  ></DefaultDropdown>
                  <DefaultDropdown
                    selectedValue={selectedValue}
                    selectedKeys={selectedKeys}
                    handleDropdownSelectionChange={
                      handleDropdownSelectionChange
                    }
                    opciones={semestre}
                  ></DefaultDropdown>
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
