import { statusColorMap, statusOptions } from "@/constants/constants";
import { PresidenteWithRole } from "@/types/types";
import { AutocompleteItem, ChipProps } from "@nextui-org/react";
import { ReactElement } from "react";

export const INITIAL_VISIBLE_COLUMNS = [
  "nombre",
  "presidente",
  "estado",
  "actions",
];

export const columnsTable = [
  { name: "NOMBRE", uid: "nombre", sortable: true },
  { name: "RESPONSABLE", uid: "presidente", sortable: true },
  { name: "UBICACION", uid: "ubicacion", sortable: true },
  { name: "ESTADO", uid: "estado", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

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

