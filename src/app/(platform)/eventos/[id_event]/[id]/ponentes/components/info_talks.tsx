import { EyeIcon, ProjectIcon } from "@/components/shared/icons";
import { ClubInternos } from "@/interfaces/ClubInternos";
import { Member } from "@/interfaces/Member";
import { Proyecto } from "@/interfaces/Proyecto";
import { formatDate, formatDateTime } from "@/utils/utils";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
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

import { FaPeopleGroup, FaUser } from "react-icons/fa6";
import { statusColorMap } from "@/constants/constants";
import { Talk } from "@/interfaces/Talk";
import { Speaker } from "@/interfaces/Speaker";

export default function InfoTalker({ talker }: { talker: Speaker }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fechaCreacion = talker.fecha_hora_creacion;
  const fechaCreacionFormateada = fechaCreacion
    ? formatDateTime(fechaCreacion!)
    : "----";

  const fechaActualizacion = talker.fecha_hora_actualizacion;
  const fechaActualizacionFormateada = fechaActualizacion
    ? formatDateTime(fechaActualizacion!)
    : "----";

  return (
    <>
      <Tooltip content="Detalles">
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
                Proyecto
              </ModalHeader>
              <ModalBody>
                <Card className="py-4">
                  <Chip
                    className="capitalize mx-4"
                    color={statusColorMap[talker.estado]}
                    size="sm"
                    variant="flat"
                  >
                    {talker.estado}
                  </Chip>
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                    <Avatar
                      showFallback
                      src="https://images.unsplash.com/broken"
                      className="w-20 h-20 text-large text-slate-600 "
                      fallback={<FaUser size={25} className=" text-primary" />}
                    />
                  </CardHeader>
                  <CardBody className="overflow-visible py-2 items-center">
                    <h4 className="font-bold uppercase text-large text-slate-600 ">
                      {talker.nombre || "" + " " + talker.apellido || ""}
                    </h4>
                    <small className="text-default-500">
                      {talker.nro_identificacion || ""}
                    </small>

                    <Divider className="mt-1" />
                    <div className="mt-5 w-full">
                      <Option value={talker.estado} label="Estado"></Option>

                      <Option
                        value={talker.telefono || ""}
                        label="Telefono"
                      ></Option>

                      <Option
                        value={talker.correo || ""}
                        label="Correo"
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
