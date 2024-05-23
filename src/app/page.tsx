import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import { Toaster } from "react-hot-toast";
import React from "react";

export default function Home() {
  return (
    <NextUIProvider>
      <App />
    </NextUIProvider>
  );
}
