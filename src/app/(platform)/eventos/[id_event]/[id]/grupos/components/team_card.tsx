import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";
import { Team } from "@/interfaces/Team";
import { MdOutlineGroups } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineGroupAdd } from "react-icons/md";
import { Participant } from "@/interfaces/Participant";
import { cutString } from "@/utils/utils";
export default function TeamCard({ team }: { team: Team }) {
  return (
    <Card className="md:w-96 w-80  hover:bg-gray-50 active:bg-gray-200 cursor-pointer">
      <CardHeader className="flex gap-3">
        <div className=" h-11 w-11 rounded-xl bg-gray-300 items-center justify-center flex">
          <MdOutlineGroups className=" h-9 w-9 text-gray-600 " />
        </div>
        <div className="flex flex-col ">
          <p className="text-lg">{cutString(team.nombre, 20)}</p>
          <p className="text-small text-default-500">{`${
            (team.capitan as Participant).nombre || "no asignado"
          } ${(team.capitan as Participant).apellido || ""}`}</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className=" flex flex-row text-xs justify-end">
          <p className=" text-default-400 pr-1">
            {team.cant_integrantes} integrantes
          </p>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex flex-row w-full">
          <div className=" p-1 rounded-full shadow-sm hover:bg-slate-100 active:bg-slate-200">
            <MdOutlineGroupAdd className="w-5 h-5 text-primary "></MdOutlineGroupAdd>
          </div>

          <div className="w-full flex justify-end items-center gap-2">
            <div className=" p-1 rounded-full shadow-sm hover:bg-slate-100 active:bg-slate-200">
              <FiEdit2 className="w-5 h-4 text-warning "></FiEdit2>
            </div>
            <div className=" p-1 rounded-full shadow-sm hover:bg-slate-100 active:bg-slate-200">
              <MdDeleteOutline className="w-5 h-5 text-danger "></MdDeleteOutline>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
