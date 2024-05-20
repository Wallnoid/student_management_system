import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { UsersICon } from "./icons";

interface SelectIconProps<T> {
  label: string;
  datas: T;
  errorMessage: any;
  isInvalid: boolean;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectIcon<T extends Record<string, unknown>>({
  label,
  datas,
  isInvalid,
  errorMessage,
  name,
  value,
  onChange,
}: SelectIconProps<T>) {
  const options = Object.entries(datas).map(([key, value]) => (
    <SelectItem key={key} value={key}>
      {String(value)}
    </SelectItem>
  ));

  return (
    <Select
      className="max-w-xs"
      startContent={<UsersICon />}
      color="primary"
      label={label}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      name={name}
      value={value}
      defaultSelectedKeys={[value]}
      onChange={onChange}
    >
      {options}
    </Select>
  );
}
