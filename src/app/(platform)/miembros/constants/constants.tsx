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

export const MembersStatusOptions = [
  { name: "Activo", uid: "activo" },
  { name: "Inactivo", uid: "inactivo" },
  { name: "Suspendido", uid: "suspendido" },
];

export const statusColorMap: Record<string, ChipProps["color"]> = {
  activo: "success",
  inactivo: "danger",
  suspendido: "warning",
};

export const optionsElements = MembersStatusOptions.map((option) => (
  <AutocompleteItem
    key={option.uid}
    textValue={option.name}
    color={statusColorMap[option.uid]}
    className={`text-primary-800 `}
  >
    {option.name}
  </AutocompleteItem>
));
