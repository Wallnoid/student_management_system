import { EyeIcon } from "@/components/shared/icons";
import { Member } from "@/interfaces/Member";
import { formatDate, formatDateTime } from "@/utils/utils";
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

const statusColorMap: Record<string, ChipProps["color"]> = {
  activo: "success",
  inactivo: "danger",
  suspendido: "warning",
};

export default function InfoMembers({ member }: { member: Member }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fechaNacimiento = member.fecha_nacimiento;
  const fechaNacimientoFormateada = fechaNacimiento
    ? formatDate(fechaNacimiento!)
    : "----";

  const fechaCreacion = member.fecha_hora_creacion;
  const fechaCreacionFormateada = fechaCreacion
    ? formatDateTime(fechaCreacion!)
    : "----";

  const fechaActualizacion = member.fecha_hora_actualizacion;
  const fechaActualizacionFormateada = fechaActualizacion
    ? formatDateTime(fechaActualizacion)
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
                Miembro
              </ModalHeader>
              <ModalBody>
                <Card className="py-4">
                  <Chip
                    className="capitalize mx-4"
                    color={statusColorMap[member.estado]}
                    size="sm"
                    variant="flat"
                  >
                    {member.estado}
                  </Chip>
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                    <Avatar
                      showFallback
                      src="https://images.unsplash.com/broken"
                      className="w-20 h-20 text-large text-slate-600 "
                    />
                  </CardHeader>
                  <CardBody className="overflow-visible py-2 items-center">
                    <h4 className="font-bold uppercase text-large text-slate-600 ">
                      {member.nombre} {member.apellido}
                    </h4>
                    <small className="text-default-500">{member.correo}</small>

                    <Divider className="mt-1" />
                    <div className="mt-5 w-full">
                      <Option
                        label={"Cedula"}
                        value={member.nro_identificacion}
                      ></Option>
                      <Option label={"Carrera"} value={member.carrera}></Option>

                      <Option
                        label={"Semestre"}
                        value={member.semestre}
                      ></Option>

                      <Option
                        label={"Telefono"}
                        value={member.telefono}
                      ></Option>

                      <Option
                        label={"F. de Nacimiento"}
                        value={fechaNacimientoFormateada}
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
