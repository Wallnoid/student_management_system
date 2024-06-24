import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
} from "@nextui-org/react";
import { Team } from "@/interfaces/Team";
import { MdOutlineGroups } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { Participant } from "@/interfaces/Participant";
import { cutString } from "@/utils/utils";
import FormModal from "./form_modal_teams";
import { statusColorMap } from "@/constants/constants";
import { deleteTeamCrud } from "../actions/teamCrud";
import ModalCrudMember from "./modal_crud_participant";
import { TeamAuxiliar } from "@/interfaces/TeamAuxiliar";
export default function TeamCard({
  team,
  id_contest,
}: {
  team: TeamAuxiliar;
  id_contest: string;
}) {
  return (
    <Card className="md:w-96 w-80  hover:bg-gray-50 active:bg-gray-200 cursor-pointer">
      <CardHeader className="flex gap-3">
        <div className=" h-11 w-11 rounded-xl bg-gray-300 items-center justify-center flex">
          <MdOutlineGroups className=" h-9 w-9 text-gray-600 " />
        </div>
        <div className="flex flex-col ">
          <p className="text-lg">{cutString(team.team.nombre, 20)}</p>
          <p className="text-small text-default-500">{`${
            (team.team.capitan as Participant).nombre || "no asignado"
          } ${(team.team.capitan as Participant).apellido || ""}`}</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className=" flex flex-row text-xs justify-end">
          <p className=" text-default-400 pr-1">
            {team.team.cant_integrantes} integrantes
          </p>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex flex-row w-full">
          <Chip
            className="capitalize"
            color={statusColorMap[team.team.estado]}
            size="sm"
            variant="flat"
          >
            {team.team.estado}
          </Chip>

          <div className="w-full flex justify-end items-center gap-2">
            <ModalCrudMember id_team={team.team.id}></ModalCrudMember>

            <FormModal team={team} id_contest={id_contest}></FormModal>
            <div className=" p-1 rounded-full shadow-sm hover:bg-slate-100 active:bg-slate-200">
              <MdDeleteOutline
                className="w-5 h-5 text-danger "
                onClick={() => deleteTeamCrud(team?.team)}
              ></MdDeleteOutline>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
