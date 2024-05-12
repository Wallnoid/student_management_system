import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

export default function DefaultSelect({
  datas,
  label,
}: {
  datas: { label: string; value: string }[];
  label: string;
}) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select label={label} className="max-w-xs">
        {datas.map((data) => (
          <SelectItem key={data.value} value={data.value}>
            {data.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
