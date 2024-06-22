import { PresidenteWithRole } from "@/types/types";
import { AutocompleteItem, ChipProps } from "@nextui-org/react";
import { ReactElement } from "react";

export const INITIAL_VISIBLE_COLUMNS = [
  "nombre",
  "responsable",
  "fecha inicio",
  "fecha fin",
  "estado",
  "actions",
];

export const columnsTable = [
  { name: "NOMBRE", uid: "nombre", sortable: true },
  { name: "RESPONSABLE", uid: "responsable", sortable: true },
  { name: "CREADOR", uid: "creado_por", sortable: true },
  { name: "FECHA INICIO", uid: "fecha_inicio", sortable: true },
  { name: "FECHA FIN", uid: "fecha_fin", sortable: true },
  { name: "ESTADO", uid: "estado", sortable: true },
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
