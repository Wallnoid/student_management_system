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
  Textarea,
} from "@nextui-org/react";

import { Toaster } from "react-hot-toast";

import { currentUser } from "@/services/users.service";
import InputSearch from "@/components/shared/input_search";
import { optionsElements, statusColorMap } from "../constants/constants";
import { ClubInternos } from "@/interfaces/ClubInternos";
import { PlusIcon } from "@/components/shared/icons";
import FormikClubes from "@/app/(platform)/clubes/constants/formik";
import MemberElementHook from "@/app/(platform)/clubes/hooks/members_hook";
import { Talk } from "@/interfaces/Talk";
import FormikTalks from "../constants/formik_talks";

export default function FormModal({
  talk,
  icon: button,
}: {
  talk?: Talk;
  icon?: JSX.Element;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { members, setMembers } = MemberElementHook();

  const onChangesPresidente = (value: string) => {
    formik.setFieldValue("presidente", value);
  };

  const onChangesEstado = (value: string) => {
    formik.setFieldValue("estado", value);
  };

  const formik = FormikTalks(talk, currentUser, onClose);

  return (
    <>
      <Toaster />
      {!talk ? (
        <Button
          color="primary"
          endContent={<PlusIcon />}
          onPress={onOpen}
          id="AddMemberButton"
        >
          Agregar Club
        </Button>
      ) : (
        <Tooltip content="Editar Club">
          <span
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
            onClick={onOpen}
          >
            {button}
          </span>
        </Tooltip>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {talk ? (
                  <div className="flex flex-row items-center">
                    <div className="w-1/2">{"Actualizar club"}</div>

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
                  "Ingresar Club"
                )}
              </ModalHeader>

              <form onSubmit={formik.handleSubmit}>
                <ModalBody>
                  <Input
                    autoFocus
                    id={`nombre_${talk?.id || ""}`}
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
                    elements={members}
                    label="Presidente"
                    placeholder="Buscar presidente"
                    name="presidente"
                    value={formik.values.presidente}
                    onChange={onChangesPresidente}
                    isInvalid={formik.errors.presidente !== undefined}
                    className={`flex 
                        ${formik.errors.nombre !== undefined ? "py-0" : "py-3"} 
                        justify-between`}
                    errorMessage={formik.errors.presidente}
                  ></InputSearch>

                  <Input
                    id={`ubicacion_${talk?.id || ""}`}
                    label="Ubicacion"
                    name="ubicacion"
                    value={formik.values.ubicacion}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.ubicacion !== undefined}
                    errorMessage={formik.errors.ubicacion}
                    placeholder="Ingresa la ubicacion del club"
                    className={
                      formik.errors.presidente !== undefined ? "py-0" : "py-3"
                    }
                    variant="bordered"
                    type="text"
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
                    {talk ? "Actualizar" : "Registrar"}
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
