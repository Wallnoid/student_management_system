import React, { ReactElement, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function InputSearch({
  elements,
  name,
  value,
  onChange,
  isInvalid,
  errorMessage,
  className,
  label,
  placeholder,
  color,
}: {
  elements: ReactElement[];
  name: string;
  value: string;
  onChange: (value: string) => void;
  isInvalid?: boolean;
  errorMessage?: string;
  className?: string;
  label: string;
  placeholder: string;
  color?: any;
}) {
  return (
    <Autocomplete
      defaultItems={elements}
      name={name}
      label={label}
      placeholder={placeholder}
      className={`${className} `}
      variant={color ? "flat" : "bordered"}
      value={value}
      onSelectionChange={(value) => onChange(String(value) || "")}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      defaultSelectedKey={value}
      color={color}
    >
      {elements}
    </Autocomplete>
  );
}
