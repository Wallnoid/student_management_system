import React, { ReactNode } from "react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { UsersICon, EyeIcon } from "./icons";

export default function SelectIcon({
  label,
  datas,
  isInvalid,
  errorMessage,
  validate,
}: {
  label: string;
  datas: object[];
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


    <Select
      className="max-w-xs"
      startContent={< UsersICon />}
      color="primary"
      label={label}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      {...validate}
    >
      {options}
    </Select >
  );
}
