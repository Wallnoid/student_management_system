import React, { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Clubes } from "@/app/(platform)/proyectos/components/form_modal";

type Data = Clubes;

export default function InputSearch({
  datas,
  name,
  value,
  onChange,
  isInvalid,
  errorMessage,
  className,
}: {
  datas: Data[];
  name: string;
  value: string;
  onChange: (value: string) => void;
  isInvalid?: boolean;
  errorMessage?: string;
  className?: string;
}) {
  return (
    <Autocomplete
      defaultItems={datas}
      name={name}
      label="Club asignado"
      placeholder="Buscar Club"
      className={`${className}`}
      variant="bordered"
      value={value}
      onSelectionChange={(value) => onChange(String(value) || "")}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
    >
      {(data) => (
        <AutocompleteItem key={data.id} textValue={data.nombre} value={data.id}>
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.nombre}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {data.presidente.nombre + " " + data.presidente.apellido}
            </p>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
