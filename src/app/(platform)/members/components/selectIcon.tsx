import React, { ReactNode } from "react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { UsersICon, EyeIcon } from "./icons";

export default function SelectIcon({
  label,
  datas,
}: {
  label: string;
  datas: { label: string; value: string; key: string }[];
}) {
  return (
    <Select
      className="max-w-xs"
      startContent={<UsersICon />}
      color="primary"
      label={label}
    >
      {datas.map((data) => (
        <SelectItem key={data.key} value={data.value}>
          {data.label}
        </SelectItem>
      ))}
    </Select>
  );
}
