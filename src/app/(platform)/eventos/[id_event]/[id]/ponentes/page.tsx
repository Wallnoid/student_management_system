"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
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
      <section className="flex flex-col w-full items-center p-9  ">
        <h1>
          Speakers Page {params.id} {params.id_event}
        </h1>
      </section>
    </>
  );
}
