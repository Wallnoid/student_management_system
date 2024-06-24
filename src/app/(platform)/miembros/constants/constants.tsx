import { statusColorMap, statusOptions } from "@/constants/constants";
import { AutocompleteItem, ChipProps } from "@nextui-org/react";

export const INITIAL_VISIBLE_COLUMNS = [
  "nombre",
  "categoria",
  "estado",
  "actions",
];

export const columnsTable = [
  { name: "ID", uid: "nro_identificacion", sortable: true },

  { name: "NOMBRE", uid: "nombre", sortable: true },
  { name: "ROL", uid: "categoria", sortable: true },
  { name: "TELEFONO", uid: "telefono" },
  { name: "EMAIL", uid: "correo" },
  { name: "ESTADO", uid: "estado", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];
