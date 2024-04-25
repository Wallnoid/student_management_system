import React from "react";
import { Input } from "@nextui-org/react";

export default function LoginInput({ type, label, isInvalid, className, onChange, id }) {
  return (
    <Input
      type={type}
      label={label}
      isInvalid={isInvalid}
      className={className}
      onChange={(e) => onChange(e.target.value)}
      id={id} name={id}
    />
  );
}
