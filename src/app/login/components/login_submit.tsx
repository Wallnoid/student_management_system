import React from "react";
import { Button } from "@nextui-org/react";

export default function LoginSubmit({
  label,
  color,
  variant,
  isLoading,
}: {
  label: string;
  color: any;
  variant: any;
  isLoading: boolean;
}) {
  return (
    <Button color={color} variant={variant} type="submit" isLoading={isLoading}>
      {label}
    </Button>
  );
}
