import {NextUIProvider} from "@nextui-org/react";
import App from "./App";

export default function Home() {
  return (
    <NextUIProvider>
      <App />
    </NextUIProvider>
  );
}
