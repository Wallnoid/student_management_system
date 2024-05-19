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

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        label={label}
        className="max-w-xs"
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        {...validate}
      >
        {datas.map((data) => (
          <SelectItem key={data.value} value={data.value}>
            {data.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
