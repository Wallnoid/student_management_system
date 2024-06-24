import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Tooltip,
} from "@nextui-org/react";

import { Toaster } from "react-hot-toast";

import { currentUser } from "@/services/users.service";
import InputSearch from "@/components/shared/input_search";
import { PlusIcon } from "@/components/shared/icons";

import { optionsElements, statusColorMap } from "../../../constants/constants";
import FormikContest from "../../../constants/formik_contests";
import { Team } from "@/interfaces/Team";
import FormikTeam from "../constants/formik";

export default function FormModal({
  teams,
  icon: button,
  cant_integrantes,
}: {
  teams?: Team;
  icon?: JSX.Element;
  cant_integrantes: number;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onChangesEstado = (value: string) => {
    formik.setFieldValue("estado", value);
  };

  const formik = FormikTeam(teams, currentUser, onClose);

  return (
    <>
      <Toaster />
      {!teams ? (
        <Button
          color="primary"
          endContent={<PlusIcon />}
          onPress={onOpen}
          id="AddMemberButton"
        >
          <p className="hidden md:block">Agregar Equipo</p>
        </Button>
      ) : (
        <Tooltip content="Editar Equipo">
          <span
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={onOpen}
          >
            {button}
          </span>
        </Tooltip>
      )}

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size={"3xl"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {teams ? (
                  <div className="flex flex-row items-center">
                    <div className="w-1/2">{"Actualizar equipo"}</div>

                    <div className="w-1/2 mx-5">
                      <InputSearch
                        label=""
                        placeholder=""
                        elements={optionsElements}
                        name="estado"
                        onChange={onChangesEstado}
                        value={formik.values.estado}
                        color={statusColorMap[formik.values.estado]}
                      ></InputSearch>
                    </div>
                  </div>
                ) : (
                  "Ingresar Equipo"
                )}
              </ModalHeader>

              <form onSubmit={formik.handleSubmit}>
                <ModalBody>
                  <Input
                    autoFocus
                    id={`nombre_${teams?.id || ""}`}
                    label="Nombre"
                    name="nombre"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.nombre !== undefined}
                    errorMessage={formik.errors.nombre}
                    placeholder="Ingresa el nombre del club"
                    variant="bordered"
                    type="text"
                  />

                  <Input
                    id={`cant_integrantes_${teams?.id || ""}`}
                    label="Cantidad de integrantes"
                    name="cant_integrantes"
                    value={cant_integrantes.toString()}
                    className={
                      formik.errors.nombre !== undefined ? "py-0" : "py-3"
                    }
                    variant="bordered"
                    type="text"
                    disabled={true}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    id="CloseButton"
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  <Button
                    id="SubmitButton"
                    color="primary"
                    type="submit"
                    isLoading={formik.isSubmitting}
                  >
                    {teams ? "Actualizar" : "Registrar"}
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
