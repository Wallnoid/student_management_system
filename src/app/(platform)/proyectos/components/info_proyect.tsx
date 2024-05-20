import { EyeIcon, ProjectIcon } from "@/components/shared/icons";
import { ClubInternos } from "@/interfaces/ClubInternos";
import { Member } from "@/interfaces/Member";
import { Proyecto } from "@/interfaces/Proyecto";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Image,
  Button,
  useDisclosure,
  Card,
  CardHeader,
  Avatar,
  CardBody,
  Divider,
  Tooltip,
  Chip,
  ChipProps,
} from "@nextui-org/react";
import { parseISO, format } from "date-fns";

const statusColorMap: Record<string, ChipProps["color"]> = {
  completado: "success",
  activo: "primary",
  suspendido: "danger",
};

export default function InfoProyect({ proyect }: { proyect: Proyecto }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fechaInicio = proyect.fecha_inicio;
  const fechaInicioFormateada = format(parseISO(fechaInicio), "dd/MM/yyyy");

  const fechaCreacion = proyect.fecha_hora_creacion;
  const fechaCreacionFormateada = format(
    parseISO(fechaCreacion!),
    "dd/MM/yyyy HH:mm"
  );

  const fechaActualizacion = proyect.fecha_hora_actualizacion;
  const fechaActualizacionFormateada = fechaActualizacion
    ? format(parseISO(fechaActualizacion!), "dd/MM/yyyy HH:mm")
    : "N/A";

  const fechaFin = proyect.fecha_fin;
  const fechaFinFormateada = format(parseISO(fechaFin!), "dd/MM/yyyy HH:mm");

  return (
    <>
      <Tooltip content="Details">
        <span
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
          onClick={onOpen}
        >
          <EyeIcon />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center justify-center">
                Miembro
              </ModalHeader>
              <ModalBody>
                <Card className="py-4">
                  <Chip
                    className="capitalize mx-4"
                    color={statusColorMap[proyect.estado]}
                    size="sm"
                    variant="flat"
                  >
                    {proyect.estado}
                  </Chip>
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                    <Avatar
                      showFallback
                      src="https://images.unsplash.com/broken"
                      className="w-20 h-20 text-large text-slate-600 "
                      fallback={<ProjectIcon />}
                    />
                  </CardHeader>
                  <CardBody className="overflow-visible py-2 items-center">
                    <h4 className="font-bold uppercase text-large text-slate-600 ">
                      {proyect.nombre}
                    </h4>
                    <small className="text-default-500">
                      {(proyect.responsable! as ClubInternos).nombre}
                    </small>

                    <Divider className="mt-1" />
                    <div className="mt-5 w-full">
                      <h2 className="text-tiny uppercase font-bold w-full text-slate-600 text-center">
                        Descripcion:
                      </h2>

                      <p className="text-tiny mx-2 my-4 mt-2 text-center text-slate-600">
                        {proyect.descripcion}
                      </p>

                      <Option
                        label={"F. de Inicio"}
                        value={fechaInicioFormateada}
                      ></Option>

                      <Option
                        label={"F. de Fin"}
                        value={fechaFinFormateada}
                      ></Option>

                      <Option
                        label={"F. de Creación"}
                        value={fechaCreacionFormateada}
                      ></Option>

                      <Option
                        label={"F. de Actualización"}
                        value={fechaActualizacionFormateada}
                      ></Option>
                    </div>
                  </CardBody>
                </Card>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function Option({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-row m-2 items-center  ">
      <p className=" text-tiny uppercase font-bold w-1/2 text-slate-600  ">
        {label}:
      </p>
      <div className="flex w-1/2 text-tiny uppercase  justify-end  ">
        <Chip color="secondary" variant="dot" size="sm">
          {value}
        </Chip>
      </div>
    </div>
  );
}
