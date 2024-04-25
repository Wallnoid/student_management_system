import React from "react";
import { Button } from "@nextui-org/react";
import { login } from "../actions";

export default function LoginSubmit({ label, color, variant }) {
  return (
    <Button color={color} variant={variant}  formAction={login} type="submit">
      {label}
    </Button>
  );
}
