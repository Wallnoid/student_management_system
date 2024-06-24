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

import { Team } from "@/interfaces/Team";
import FormikTeam from "../constants/formik";
import { FiEdit2 } from "react-icons/fi";
import { optionsElements, statusColorMap } from "@/constants/constants";
import { TeamAuxiliar } from "@/interfaces/TeamAuxiliar";

export default function FormModal({
  team,
  icon: button,
  cant_integrantes,
  num_equipos,
  max_equipos,
  id_contest,
}: {
  team?: TeamAuxiliar;
  icon?: JSX.Element;
  cant_integrantes?: number;
  num_equipos?: number;
  max_equipos?: number;
  id_contest: string;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onChangesEstado = (value: string) => {
    formik.setFieldValue("estado", value);
  };

  const send = () => {
    formik.setFieldValue("cant_integrantes", cant_integrantes);
    formik.setFieldValue("id_contest", id_contest);
  };

  const formik = FormikTeam(team, currentUser, onClose);

  return (
    <>
      <Toaster />
      {!team ? (
        <Button
          color="primary"
          endContent={<PlusIcon />}
          onPress={onOpen}
          id="AddEquipoButton"
          isDisabled={num_equipos >= max_equipos}
        >
          <p className="hidden md:block ">Agregar Equipo</p>
        </Button>
      ) : (
        <div className=" p-1 rounded-full shadow-sm hover:bg-slate-100 active:bg-slate-200">
          <FiEdit2 className="w-5 h-4 text-warning " onClick={onOpen}></FiEdit2>
        </div>
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
                {team ? (
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
                    id={`nombre_${team?.team.id || ""}`}
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
                    autoFocus
                    id={`costo_${team?.team.id || ""}`}
                    label="Costo de inscripción"
                    name="costo"
                    value={formik.values.costo.toString()}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.costo !== undefined}
                    errorMessage={formik.errors.costo}
                    placeholder="Ingresa el costo de inscripción"
                    variant="bordered"
                    type="text"
                  />

                  <Input
                    id={`cant_integrantes_${team?.team.id || ""}`}
                    label="Cantidad de integrantes"
                    name="cant_integrantes"
                    value={`${
                      cant_integrantes || formik.values.cant_integrantes
                    }`}
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
                    onPress={() => send()}
                    isLoading={formik.isSubmitting}
                  >
                    {team ? "Actualizar" : "Registrar"}
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
