import { DeleteIcon, EditIcon } from "@/components/shared/icons";
import { Member } from "@/interfaces/Member";
import { renderCellType } from "@/types/types";
import { cutString } from "@/utils/utils";
import { Chip, Tooltip, User } from "@nextui-org/react";
import { FaPeopleGroup } from "react-icons/fa6";
import { Contest } from "@/interfaces/Contest";
import FormModal from "../components/contest/form_modal_contest";
import InfoContest from "../components/contest/info_contests";
import { deleteContestCrud } from "../actions/crud_contets";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { goToGroups } from "../actions/go_to_groups";
import { statusColorMap } from "@/constants/constants";

export default function renderItems(
  contest: Contest,
  cellValue: any,
  router: AppRouterInstance,
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

          <FormModal icon={<EditIcon />} contest={contest}></FormModal>

          <Tooltip content="Eliminar Concurso">
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => deleteContestCrud(contest!)}
            >
              <DeleteIcon />
            </span>
          </Tooltip>

          <Tooltip content="informacion">
            <span
              className="text-lg text-default-500 cursor-pointer active:opacity-50"
              onClick={() => goToGroups(id_event, contest.id, router)}
            >
              <IoIosInformationCircleOutline />
            </span>
          </Tooltip>
        </div>
      ),
    },
  ];
}
