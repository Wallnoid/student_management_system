import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <NextUIProvider>
      <App />
    </NextUIProvider>
  );
}
