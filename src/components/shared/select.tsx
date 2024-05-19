import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface DefaultSelectProps<T> {
  datas: T;
  label: string;
  errorMessage: any;
  isInvalid: boolean;
  validate: any;
}

export default function DefaultSelect<T extends Record<string, unknown>>({
  datas,
  label,
  isInvalid,
  errorMessage,
  validate,
}: DefaultSelectProps<T>) {

  const options = Object.entries(datas).map(([key, value]) => (
    <SelectItem key={key} value={key}>
      {String(value)}
    </SelectItem>
  ));

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        label={label}
        className="max-w-xs"
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        {...validate}
      >
        {options}
      </Select>
    </div>
  );
}