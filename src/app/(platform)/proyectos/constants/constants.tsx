import { statusColorMap, statusOptions } from "@/constants/constants";
import { Clubes } from "@/types/types";
import { formatDate } from "@/utils/utils";
import { AutocompleteItem, ChipProps } from "@nextui-org/react";
import { ReactElement } from "react";

const columnsTable = [
  { name: "NOMBRE", uid: "nombre", sortable: true },
  { name: "CLUB", uid: "responsable", sortable: true },
  {
    name: "FECHA INICIO",
    uid: "fecha_inicio",
    sortable: true,
    format: (value: string) => {
      return formatDate(value);
    },
  },
  { name: "FECHA FIN", uid: "fecha_fin", sortable: true },
  { name: "ESTADO", uid: "estado", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "nombre",
  "responsable",
  "fecha_inicio",
  "fecha_fin",
  "estado",
  "actions",
];

const createObject = (data: Clubes): ReactElement => {
  return (
    <AutocompleteItem key={data.id} textValue={data.nombre}>
      <div className="flex flex-col">
        <p className="text-bold text-small capitalize">{data.nombre}</p>
        <p className="text-bold text-tiny capitalize text-default-400">
          {data.presidente.nombre + " " + data.presidente.apellido}
        </p>
      </div>
    </AutocompleteItem>
  );
};

export { columnsTable, INITIAL_VISIBLE_COLUMNS, statusColorMap, createObject };
