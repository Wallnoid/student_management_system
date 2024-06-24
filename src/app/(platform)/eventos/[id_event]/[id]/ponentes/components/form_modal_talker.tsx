import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

import { Toaster } from "react-hot-toast";

import { currentUser } from "@/services/users.service";
import { FiEdit2 } from "react-icons/fi";
import { PlusIcon } from "@/components/shared/icons";
import FormikTalker from "../constants/formik_talker";
import { Speaker } from "@/interfaces/Speaker";

export default function FormModal({
  talker,
  icon: button,
  id_talk,
}: {
  talker?: Speaker;
  icon?: JSX.Element;
  id_talk: string;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onChanges = (value: string) => {
    formik.setFieldValue("estado", value);
  };

  const send = () => {
    formik.setFieldValue("id_talk", id_talk);
  };

  const formik = FormikTalker(talker, currentUser);

  return (
    <>
      <Toaster />
      {!talker ? (
        <Button
          color="primary"
          endContent={<PlusIcon />}
          onPress={onOpen}
          id="AddSpeakerButton"
        >
          Agregar Ponente
        </Button>
      ) : (
        <div className=" p-1 rounded-full shadow-sm hover:bg-slate-100 active:bg-slate-200">
          <FiEdit2 className="w-5 h-4 text-warning " onClick={onOpen}></FiEdit2>
        </div>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {talker ? "Actualizar Participante" : "Ingresar Participante"}
              </ModalHeader>

              <form onSubmit={formik.handleSubmit}>
                <ModalBody>
                  {talker ? (
                    <Input
                      isDisabled
                      id={`correo_disable_${talker?.id || ""}`}
                      label="Correo"
                      name="correo"
                      value={formik.values.correo}
                      placeholder="Ingresa tu correo"
                      variant="bordered"
                      type="email"
                    />
                  ) : null}
                  <Input
                    autoFocus
                    id={`cedula_${talker?.id || ""}`}
                    label="Cedula"
                    name="cedula"
                    value={formik.values.cedula}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.cedula !== undefined}
                    errorMessage={formik.errors.cedula}
                    placeholder="Ingresa tu cedula"
                    variant="bordered"
                    type="text"
                  />

                  <div
                    className={`flex ${
                      formik.errors.cedula !== undefined ? "py-0" : "py-3"
                    }  justify-between`}
                  >
                    <Input
                      id={`nombre_${talker?.id || ""}`}
                      label="Nombre"
                      name="nombre"
                      value={formik.values.nombre}
                      onChange={formik.handleChange}
                      isInvalid={formik.errors.nombre !== undefined}
                      errorMessage={formik.errors.nombre}
                      placeholder="Ingresa tu nombre"
                      variant="bordered"
                      className="w-full sm:w-1/2 mx-1"
                      type="text"
                    />
                    <Input
                      id={`apellido_${talker?.id || ""}`}
                      label="Apellido"
                      name="apellido"
                      value={formik.values.apellido}
                      onChange={formik.handleChange}
                      isInvalid={formik.errors.apellido !== undefined}
                      errorMessage={formik.errors.apellido}
                      placeholder="Ingresa tu apellido"
                      variant="bordered"
                      className="w-full sm:w-1/2"
                      type="text"
                    />
                  </div>

                  <Input
                    id={`telefono_${talker?.id || ""}`}
                    label="Telefono"
                    name="telefono"
                    value={formik.values.telefono}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.telefono !== undefined}
                    errorMessage={formik.errors.telefono}
                    placeholder="Ingresa tu telefono"
                    className={
                      formik.errors.nombre !== undefined ||
                      formik.errors.apellido !== undefined
                        ? "py-0"
                        : "py-3"
                    }
                    variant="bordered"
                    type="text"
                  />

                  {!talker ? (
                    <Input
                      id={`correo_${talker?.id || ""}`}
                      label="Correo"
                      name="correo"
                      value={formik.values.correo}
                      onChange={formik.handleChange}
                      isInvalid={formik.errors.correo !== undefined}
                      errorMessage={formik.errors.correo}
                      placeholder="Ingresa tu correo"
                      className={
                        formik.errors.telefono !== undefined ? "py-0" : "py-3"
                      }
                      variant="bordered"
                      type="email"
                    />
                  ) : null}

                  <Input
                    id={`titulo_${talker?.id || ""}`}
                    label="Titulo Profesional"
                    name="titulo"
                    value={formik.values.titulo}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.titulo !== undefined}
                    errorMessage={formik.errors.titulo}
                    placeholder="Ingresa el titulo del ponente"
                    className={
                      formik.errors.correo !== undefined ? "py-0" : "py-3"
                    }
                    variant="bordered"
                    type="email"
                  />

                  <Input
                    id={`precio_${talker?.id || ""}`}
                    label="Costo participacion"
                    name="costo"
                    value={formik.values.costo.toString()}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.costo !== undefined}
                    errorMessage={formik.errors.costo}
                    placeholder="Ingresa el costo de participacion"
                    className={
                      formik.errors.titulo !== undefined ? "py-0" : "py-3"
                    }
                    variant="bordered"
                    type="email"
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
                    {talker ? "Actualizar" : "Registrar"}
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
