import React from "react";
import { Button } from "@nextui-org/react";

export default function LoginSubmit({ label, color, variant }) {
  return (
    <Button color={color} variant={variant} type="submit">
      {label}
    </Button>
  );
}
