import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

export default function DefaultSelect({
  datas,
  label,
  isInvalid,
  errorMessage,
  validate,
}: {
  datas: object[];
  label: string;
  errorMessage: any;
  isInvalid: boolean;
  validate: any;
}) {

  const options = Object.entries(datas).map(([key, value]) => (
    <SelectItem key={key} value={key}>
      {value}
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
