import React, { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Member } from "@/interfaces/Member";

type Data = Member;

export default function SelectUsers({
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
      label="Miembro encargado"
      placeholder="Buscar Miembro"
      className={`${className}`}
      variant="bordered"
      value={value}
      onSelectionChange={(value) => onChange(String(value) || "")}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
    >
      {(data) => (
        <AutocompleteItem key={data.id || `default-${Math.random()}`} textValue={data.nombre +" " +data.apellido} value={data.id}>
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.nombre + data.apellido}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {data.correo.toLowerCase()}
            </p>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
