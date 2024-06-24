"use client";
import { BreadcrumbItem, Breadcrumbs, Tab, Tabs } from "@nextui-org/react";
import ContestTable from "./components/contest/table_of_contests";
import EventHook from "./hooks/event_hook";
import TalksTable from "./components/talk/table_of_talks";

export default function UnicEventPage({
  params,
}: {
  params: { id_event: string };
}) {
  const { event, setEvent } = EventHook(true, params.id_event);

  return (
    <>
      <Breadcrumbs className="mx-5 mt-1">
        <BreadcrumbItem href="/eventos">Eventos</BreadcrumbItem>
        <BreadcrumbItem>{event[0]?.nombre}</BreadcrumbItem>
      </Breadcrumbs>
      <section className="flex flex-col w-full items-center my-5 lg:my-0">
        <Tabs aria-label="Options" size="lg">
          <Tab key={"concursos"} title={"Concursos"} className="w-full">
            <ContestTable id={params.id_event}></ContestTable>
          </Tab>
          <Tab key={"charlas"} title={"Charlas"} className="w-full">
            <TalksTable id={params.id_event}></TalksTable>
          </Tab>
        </Tabs>
      </section>
    </>
  );
}
