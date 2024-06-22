"use client";
import { BreadcrumbItem, Breadcrumbs, Tab, Tabs } from "@nextui-org/react";
import TalksTable from "./components/table_of_talks";
import ContestTable from "./components/table_of_contests";

export default function UnicEventPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Breadcrumbs className="mx-5 mt-1">
        <BreadcrumbItem href="/eventos">Eventos</BreadcrumbItem>
        <BreadcrumbItem>{params.id}</BreadcrumbItem>
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
