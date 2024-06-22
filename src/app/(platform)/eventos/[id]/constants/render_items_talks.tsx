import { DeleteIcon, EditIcon } from "@/components/shared/icons";
import { Member } from "@/interfaces/Member";
import { renderCellType } from "@/types/types";
import { cutString } from "@/utils/utils";
import { Chip, Tooltip, User } from "@nextui-org/react";
import { statusColorMap } from "./constants";
import { deleteTalkCrud } from "../actions/crud_talks";
import InfoTalks from "../components/info_talks";
import { FaPeopleGroup } from "react-icons/fa6";
import FormModal from "../components/form_modal_talks";
import { Talk } from "@/interfaces/Talk";
import { BiMapPin } from "react-icons/bi";
export default function renderItems(
  talk: Talk,
  cellValue: any
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
      key: "creado_por",
      reactHelement: (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">
            {(talk.creado_por as Member).nombre +
              " " +
              (talk.creado_por as Member).apellido}
          </p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {(talk.creado_por as Member).categoria}
          </p>
        </div>
      ),
    },
    {
      key: "lugar",
      reactHelement: (
        <div className="flex flex-row gap-1 items-center">
          <BiMapPin className="w-5 h-5 text-primary-500"></BiMapPin>
          <p className="">{cellValue}</p>
        </div>
      ),
    },
    {
      key: "estado",
      reactHelement: (
        <Chip
          className="capitalize"
          color={statusColorMap[talk.estado]}
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
          <InfoTalks talks={talk}></InfoTalks>

          {/*<ModalMembers club={event}></ModalMembers> */}

          <FormModal icon={<EditIcon />} talk={talk}></FormModal>

          <Tooltip color="danger" content="Eliminar Miembro">
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => deleteTalkCrud(talk!)}
            >
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      ),
    },
  ];
}
