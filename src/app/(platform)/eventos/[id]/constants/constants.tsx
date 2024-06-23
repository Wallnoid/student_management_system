import { PresidenteWithRole } from "@/types/types";
import { AutocompleteItem, ChipProps } from "@nextui-org/react";
import { ReactElement } from "react";

export const INITIAL_VISIBLE_COLUMNS_TALKS = [
  "nombre",
  "creado_por",
  "hora_inicio",
  "hora_fin",
  "estado",
  "actions",
];

export const INITIAL_VISIBLE_COLUMNS_CONTEST = [
  "nombre",
  "responsable",
  "fecha_inicio",
  "fecha_fin",
  "estado",
  "actions",
];

export const columnsTableTalks = [
  { name: "NOMBRE", uid: "nombre", sortable: true },
  { name: "CREADO POR", uid: "creado_por", sortable: true },
  { name: "HORA INICIO", uid: "hora_inicio", sortable: true },
  { name: "HORA FIN", uid: "hora_fin", sortable: true },
  { name: "LUGAR", uid: "lugar", sortable: true },
  { name: "ESTADO", uid: "estado", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const columnsTableContests = [
  { name: "NOMBRE", uid: "nombre", sortable: true },
  { name: "RESPONSABLE", uid: "responsable" },
  { name: "N° PARTICIPANTES", uid: "cantidad_participantes", sortable: true },
  { name: "ESTADO", uid: "estado", sortable: true },
  { name: "FECHA INICIO", uid: "fecha_inicio", sortable: true },
  { name: "FECHA FIN", uid: "fecha_fin", sortable: true },
  { name: "HORA INICIO", uid: "hora_inicio", sortable: true },
  { name: "HORA FIN", uid: "hora_fin", sortable: true },
  { name: "LUGAR", uid: "lugar", sortable: true },
  { name: "CATEGORIA", uid: "categoria", sortable: true },
  { name: "MAX INTE. EQUIPO", uid: "cant_integrantes_por_equipo" },
  { name: "ACTIONS", uid: "actions" },
];

export const EventsStatusOptions = [
  { name: "Activo", uid: "activo" },
  { name: "Inactivo", uid: "inactivo" },
  { name: "Suspendido", uid: "suspendido" },
];

export const statusColorMap: Record<string, ChipProps["color"]> = {
  activo: "success",
  inactivo: "danger",
  suspendido: "warning",
};

export const createObject = (data: PresidenteWithRole): ReactElement => {
  return (
    <AutocompleteItem
      key={data.id}
      textValue={data.nombre + " " + data.apellido}
    >
      <div className="flex flex-col">
        <p className="text-bold text-small capitalize">
          {data.nombre + " " + data.apellido}
        </p>
        <p className="text-bold text-tiny capitalize text-default-400">
          {data.categoria}
        </p>
      </div>
    </AutocompleteItem>
  );
};

export const optionsElements = EventsStatusOptions.map((option) => (
  <AutocompleteItem
    key={option.uid}
    textValue={option.name}
    color={statusColorMap[option.uid]}
    className={`text-primary-800 `}
  >
    {option.name}
  </AutocompleteItem>
));
