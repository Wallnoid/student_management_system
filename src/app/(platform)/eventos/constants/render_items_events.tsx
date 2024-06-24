import { DeleteIcon, EditIcon } from "@/components/shared/icons";
import { Member } from "@/interfaces/Member";
import { renderCellType } from "@/types/types";
import { cutString } from "@/utils/utils";
import { Chip, Tooltip, User } from "@nextui-org/react";
import { statusColorMap } from "./constants";
import { deleteEventCrud } from "../actions/crud_events";
import InfoEventos from "../components/info_eventos";
import { FaPeopleGroup } from "react-icons/fa6";
import FormModal from "../components/form_modal";
import { Event } from "@/interfaces/Event";
import { goToActivities } from "../actions/go_to_activities";
import { MdChecklistRtl } from "react-icons/md";
import { FiInfo } from "react-icons/fi";

export default function renderItems(
  event: Event,
  cellValue: any,
  router: any
): renderCellType[] {
  return [
    {
      key: "nombre",
      reactHelement: (
        <User
          avatarProps={{
            radius: "lg",
            showFallback: true,
            src: "https://images.unsplash.com/broken",
            fallback: <FaPeopleGroup size={25} className=" text-primary" />,
          }}
          name={cutString(cellValue, 20)}
        ></User>
      ),
    },
    {
      key: "responsable",
      reactHelement: (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">
            {(event.responsable as Member).nombre +
              " " +
              (event.responsable as Member).apellido}
          </p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {(event.responsable as Member).categoria}
          </p>
        </div>
      ),
    },
    {
      key: "creado_por",
      reactHelement: (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">
            {(event.responsable as Member).nombre +
              " " +
              (event.responsable as Member).apellido}
          </p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {(event.responsable as Member).categoria}
          </p>
        </div>
      ),
    },
    {
      key: "estado",
      reactHelement: (
        <Chip
          className="capitalize"
          color={statusColorMap[event.estado]}
          size="sm"
          variant="flat"
        >
          {cellValue}
        </Chip>
      ),
    },
    {
      key: "actions",
      reactHelement: (
        <div className="relative flex items-center gap-2">
          <InfoEventos events={event}></InfoEventos>

          <FormModal icon={<EditIcon />} event={event}></FormModal>

          <Tooltip color="danger" content="Eliminar Miembro">
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => deleteEventCrud(event!)}
            >
              <DeleteIcon />
            </span>
          </Tooltip>
          <Tooltip content="Informacion">
            <span
              className="text-lg cursor-pointer active:opacity-50"
              onClick={() => goToActivities(event!.id ?? "", router)}
            >
              <FiInfo color="grey" />
            </span>
          </Tooltip>
        </div>
      ),
    },
  ];
}
