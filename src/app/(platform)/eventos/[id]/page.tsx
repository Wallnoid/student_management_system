"use client";
import { BreadcrumbItem, Breadcrumbs, Tab, Tabs } from "@nextui-org/react";
import TalksTable from "./components/table_of_talks";
import ContestTable from "./components/table_of_contests";
import EventHook from "./hooks/event_hook";

export default function UnicEventPage({ params }: { params: { id: string } }) {
  const { event, setEvent } = EventHook(true, params.id);

  return (
    <>
      <Breadcrumbs className="mx-5 mt-1">
        <BreadcrumbItem href="/eventos">Eventos</BreadcrumbItem>
        <BreadcrumbItem>{event[0]?.nombre}</BreadcrumbItem>
      </Breadcrumbs>
      <section className="flex flex-col w-full items-center  ">
        <Tabs aria-label="Options" size="lg">
          <Tab key={"concursos"} title={"Concursos"} className="w-full">
            <ContestTable id={params.id}></ContestTable>
          </Tab>
          <Tab key={"charlas"} title={"Charlas"} className="w-full">
            <TalksTable id={params.id}></TalksTable>
          </Tab>
        </Tabs>
      </section>
    </>
  );
}
