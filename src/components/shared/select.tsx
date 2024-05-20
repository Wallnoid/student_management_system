import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface DefaultSelectProps<T> {
  id: string;
  datas: T;
  label: string;
  errorMessage: any;
  isInvalid: boolean;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function DefaultSelect<T extends Record<string, unknown>>({
  id,
  datas,
  label,
  isInvalid,
  errorMessage,
  name,
  value,
  onChange,
}: DefaultSelectProps<T>) {
  const options = Object.entries(datas).map(([key, value]) => (
    <SelectItem key={key} value={key}>
      {String(value)}
    </SelectItem>
  ));

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        id={id}
        label={label}
        className="max-w-xs"
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        name={name}
        value={value}
        onChange={onChange}
        defaultSelectedKeys={[value]}
      >
        {options}
      </Select>
    </div>
  );
}
