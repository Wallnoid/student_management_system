import { AutocompleteItem, ChipProps } from "@nextui-org/react";

export const statusColorMap: Record<string, ChipProps["color"]> = {
  activo: "success",
  inactivo: "danger",
  suspendido: "warning",
};

export const statusOptions = [
  { name: "Activo", uid: "activo" },
  { name: "Inactivo", uid: "inactivo" },
  { name: "Suspendido", uid: "suspendido" },
];

export const optionsElements = statusOptions.map((option) => (
  <AutocompleteItem
    key={option.uid}
    textValue={option.name}
    color={statusColorMap[option.uid]}
    className={`text-primary-800 `}
  >
    {option.name}
  </AutocompleteItem>
));