import { useState } from "react";
import { DateValue, parseDate } from "@internationalized/date";
import { currentDate } from "@/constants/date_constants";

export function dateInicioHook(fecha_inicio: string) {
  const [fecha, setFecha] = useState<DateValue>(
    parseDate(fecha_inicio || currentDate)
  );

  return { fecha, setFecha };
}

export function dateFinalHook(actualDate: Date, fecha_fin: string) {
  const currentDate: string = `${actualDate.getFullYear()}-${(
    actualDate.getMonth() + 2
  )
    .toString()
    .padStart(2, "0")}-${actualDate.getDate().toString().padStart(2, "0")}`;

  const [fechaFinal, setFechaFinal] = useState<DateValue>(
    parseDate(fecha_fin || currentDate)
  );

  return { fechaFinal, setFechaFinal };
}
