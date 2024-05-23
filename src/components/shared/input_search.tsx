import React, { ReactElement, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Clubes } from "@/app/(platform)/proyectos/components/form_modal";

type Data = Clubes;

export default function InputSearch({
  elements,
  name,
  value,
  onChange,
  isInvalid,
  errorMessage,
  className,
}: {
  elements: ReactElement[];
  name: string;
  value: string;
  onChange: (value: string) => void;
  isInvalid?: boolean;
  errorMessage?: string;
  className?: string;
}) {
  return (
    <Autocomplete
      defaultItems={elements}
      name={name}
      label="Club asignado"
      placeholder="Buscar Club"
      className={`${className}`}
      variant="bordered"
      value={value}
      onSelectionChange={(value) => onChange(String(value) || "")}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      defaultSelectedKey={value}
    >
      {elements}
    </Autocomplete>
  );
}
