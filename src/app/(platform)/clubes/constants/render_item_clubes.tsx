import { DeleteIcon, EditIcon, MemberIcon } from "@/components/shared/icons";
import { ClubInternos } from "@/interfaces/ClubInternos";
import { Member } from "@/interfaces/Member";
import { Presidente, renderCellType } from "@/types/types";
import { cutString } from "@/utils/utils";
import { Chip, Tooltip, User } from "@nextui-org/react";
import { statusColorMap } from "./constants";
import FormModal from "../components/form_modal";
import { deleteClub } from "../actions/crud_clubes";
import InfoClubes from "../components/info_clubes";
import { FaPeopleGroup } from "react-icons/fa6";
import ModalMembers from "../components/modal_members";

export default function renderItems(
  club: ClubInternos,
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
      key: "presidente",
      reactHelement: (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">
            {(club.presidente as Member).nombre +
              " " +
              (club.presidente as Member).apellido}
          </p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {(club.presidente as Member).categoria}
          </p>
        </div>
      ),
    },
    {
      key: "estado",
      reactHelement: (
        <Chip
          className="capitalize"
          color={statusColorMap[club.estado]}
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
          <InfoClubes club={club}></InfoClubes>

          <ModalMembers club={club}></ModalMembers>

          <FormModal icon={<EditIcon />} club={club}></FormModal>

          <Tooltip color="danger" content="Eliminar Miembro">
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => deleteClub(club!.id ?? "")}
            >
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      ),
    },
  ];
}
