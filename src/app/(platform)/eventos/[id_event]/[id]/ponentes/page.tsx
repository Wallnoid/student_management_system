"use client";

import { BreadcrumbItem, Breadcrumbs, Divider } from "@nextui-org/react";
import EventHook from "../../hooks/event_hook";

export default function SpeakersPage({
  params,
}: {
  params: { id_event: string; id: string };
}) {
  const { event, setEvent } = EventHook(true, params.id_event);

  return (
    <>
      <Breadcrumbs className="mx-5 mt-1">
        <BreadcrumbItem href="/eventos">Eventos</BreadcrumbItem>
        <BreadcrumbItem href={`/eventos/${params.id_event}`}>
          {event[0]?.nombre}
        </BreadcrumbItem>
        <BreadcrumbItem href={`/eventos/${params.id}`}>
          Falta aqui
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
            {/* <FormModal cant_integrantes={10}></FormModal> */}
          </div>
        </div>

        <Divider className="mb-1 mt-3" />

        <div className="w-full text-default-400 text-sm mb-10">
          Maximo de participante por equipo: {10}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 grid-cols-1 gap-4 ">
          {/* {team.map((team) => (
            <TeamCard team={team} />
          ))} */}
        </div>
      </section>
    </>
  );
}
