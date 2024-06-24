"use client";

import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Divider,
} from "@nextui-org/react";
import EventHook from "../../hooks/event_hook";
import TeamHook from "./hooks/teams_hook";
import loadingHook from "@/components/shared/table/hooks/loading_hook";
import TeamCard from "./components/team_card";
import { IoMdAdd } from "react-icons/io";
import FormModal from "./components/form_modal_teams";
import ContestHook from "./hooks/contest_hook";

export default function GroupsPage({
  params,
}: {
  params: { id_event: string; id: string };
}) {
  const { loading, setLoading } = loadingHook();
  const { event, setEvent } = EventHook(true, params.id_event);
  const { contest, setContest } = ContestHook(params.id);

  const { team, setTeam } = TeamHook(loading);

  return (
    <>
      <Breadcrumbs className="mx-5 mt-1">
        <BreadcrumbItem href="/eventos">Eventos</BreadcrumbItem>
        <BreadcrumbItem href={`/eventos/${params.id_event}`}>
          {event[0]?.nombre}
        </BreadcrumbItem>
        <BreadcrumbItem href={`/eventos/${params.id}`}>
          {contest?.nombre}
        </BreadcrumbItem>
      </Breadcrumbs>
      <section className="flex flex-col w-full  items-center p-9  ">
        <div className="flex flex-row w-full justify-center items-center">
          <div className="w-full flex justify-end items-center">
            <h1 className=" text-2xl font-semibold text-default-500">
              EQUIPOS
            </h1>
          </div>

          <div className=" w-full flex flex-row justify-end items-center">
            <FormModal cant_integrantes={10}></FormModal>
          </div>
        </div>

        <Divider className="mb-1 mt-3" />

        <div className="w-full text-default-400 text-sm mb-10">
          Maximo de participante por equipo: {10}
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-center  ">
          {team.map((team) => (
            <TeamCard team={team} key={team.id} />
          ))}
        </div>
      </section>
    </>
  );
}
