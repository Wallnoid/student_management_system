"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { CircularProgress } from "@nextui-org/react";

export default function App() {
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => redirect("/home");
  }, []);

  return (
    <div className=" w-screen h-screen flex items-center justify-center ">
      <CircularProgress
        aria-label="Loading..."
        size="lg"
        value={value}
        color="primary"
        showValueLabel={true}
      />
    </div>
  );
}
