import React, { useState } from "react";
import { Autocomplete, AutocompleteItem, Select, SelectItem } from "@nextui-org/react";
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
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
      name={name}
      label="Miembros del Club"
      placeholder="Buscar Miembro"
      className={`${className}`}
      variant="bordered"
      value={value}
      onSelectionChange={(value) => onChange(String(value) || "")}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      >
        {datas.map((member) => (
          <SelectItem key={member.id ?? ''} value={member.id}>
            {member.nombre} 
          </SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500">Miembros Seleccionados: {Array.from(datas).join(", ")}</p>
    </div>

  );
}
