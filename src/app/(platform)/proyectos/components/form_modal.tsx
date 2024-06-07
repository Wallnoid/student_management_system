import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  DateInput,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import { PlusIcon } from "../../../../components/shared/icons";

import InputSearch from "@/components/shared/input_search";
import { Proyecto } from "@/interfaces/Proyecto";
import { Toaster } from "react-hot-toast";
import { currentUser } from "@/services/users.service";

import { dateFinalHook, dateInicioHook } from "../hooks/date_hook";
import { actualDate } from "@/components/shared/table/constants/date_constants";
import FormikProject from "../constants/formik";
import ClubElementHook from "../hooks/asignation_club_hook";

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { fecha, setFecha } = dateInicioHook(actualDate, project);

  const { fechaFinal, setFechaFinal } = dateFinalHook(actualDate, project);

  const { clubElements, setClubElements } = ClubElementHook();

  const onChanges = (value: string) => {
    formik.setFieldValue("responsable", value);
  };

  const formik = FormikProject(project, currentUser);

  const asignFechas = () => {
    console.log(typeof fecha);
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
                {project ? "Actualizar Proyecto" : "Agregar Proyecto"}
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
                    label="Responsable"
                    placeholder="Buscar Club"
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
                    <DateInput
                      value={fecha}
                      onChange={(date) => {
                        setFecha(date);
                      }}
                      label="Fecha Inicio"
                      className="max-w-[284px]"
                      isInvalid={formik.errors.fechaInicio !== undefined}
                      errorMessage={formik.errors.fechaInicio}
                    />

                    <div className=" w-2"></div>
                    <DateInput
                      value={fechaFinal}
                      onChange={(date) => {
                        setFechaFinal(date);
                      }}
                      label="Fecha Final"
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
                  <Button
                    color="primary"
                    type="submit"
                    onPress={asignFechas}
                    isLoading={formik.isSubmitting}
                  >
                    {project ? "Actualizar" : "Registrar"}
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
