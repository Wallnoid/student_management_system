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

const statusOptions = [
  { name: "Activo", uid: "activo" },
  { name: "Completado", uid: "completado" },
  { name: "Suspendido", uid: "suspendido" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "nombre",
  "responsable",
  "fecha_inicio",
  "fecha_fin",
  "estado",
  "actions",
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  activo: "primary",
  completado: "success",
  suspendido: "danger",
};

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

export const EventsStatusOptions = [
  { name: "Activo", uid: "activo" },
  { name: "Inactivo", uid: "inactivo" },
  { name: "Suspendido", uid: "suspendido" },
];

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

export {
  columnsTable,
  statusOptions,
  INITIAL_VISIBLE_COLUMNS,
  statusColorMap,
  createObject,
};
