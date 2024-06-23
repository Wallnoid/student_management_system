import { DeleteIcon, EditIcon } from "@/components/shared/icons";
import { Member } from "@/interfaces/Member";
import { renderCellType } from "@/types/types";
import { cutString } from "@/utils/utils";
import { Chip, Tooltip, User } from "@nextui-org/react";
import { statusColorMap } from "./constants";
import { FaPeopleGroup } from "react-icons/fa6";
import { Contest } from "@/interfaces/Contest";
import { deleteContestCrud } from "../actions/crud_contets";
import InfoContest from "../components/info_contests";
import FormModal from "../components/form_modal_contest";

export default function renderItems(
  contest: Contest,
  cellValue: any,
  id_event: string
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
            {(contest.responsable as Member).nombre +
              " " +
              (contest.responsable as Member).apellido}
          </p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {(contest.responsable as Member).categoria}
          </p>
        </div>
      ),
    },
    {
      key: "estado",
      reactHelement: (
        <Chip
          className="capitalize"
          color={statusColorMap[contest.estado]}
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
          <InfoContest contest={contest}></InfoContest>

          {/*<ModalMembers club={event}></ModalMembers> */}

          <FormModal
            icon={<EditIcon />}
            contest={contest}
            id_event={id_event}
          ></FormModal>

          <Tooltip color="danger" content="Eliminar Miembro">
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => deleteContestCrud(contest!)}
            >
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      ),
    },
  ];
}
