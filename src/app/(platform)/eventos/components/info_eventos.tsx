import { EyeIcon } from "@/components/shared/icons";
import { Member } from "@/interfaces/Member";
import { formatDateTime } from "@/utils/utils";
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

import { FaPeopleGroup } from "react-icons/fa6";
import { statusColorMap } from "@/constants/constants";
import { Event } from "@/interfaces/Event";

export default function InfoEventos({ events }: { events: Event }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fechaCreacion = events.fecha_hora_creacion;
  const fechaCreacionFormateada = fechaCreacion
    ? formatDateTime(fechaCreacion!)
    : "----";

  const fechaActualizacion = events.fecha_hora_actualizacion;
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
                    color={statusColorMap[events.estado]}
                    size="sm"
                    variant="flat"
                  >
                    {events.estado}
                  </Chip>
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                    <Avatar
                      showFallback
                      src="https://images.unsplash.com/broken"
                      className="w-20 h-20 text-large text-slate-600 "
                      fallback={
                        <FaPeopleGroup size={25} className=" text-primary" />
                      }
                    />
                  </CardHeader>
                  <CardBody className="overflow-visible py-2 items-center">
                    <h4 className="font-bold uppercase text-large text-slate-600 ">
                      {events.nombre}
                    </h4>
                    <small className="text-default-500">
                      {(events.responsable! as Member).nombre +
                        " " +
                        (events.responsable! as Member).apellido}
                    </small>

                    <Divider className="mt-1" />
                    <div className="mt-5 w-full">
                      <h2 className="text-tiny uppercase font-bold w-full text-slate-600 text-center">
                        Descripcion:
                      </h2>

                      <p className="text-tiny mx-2 my-4 mt-2 text-center text-slate-600">
                        {events.descripcion}
                      </p>

                      <Option value={events.estado} label="Estado"></Option>

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
