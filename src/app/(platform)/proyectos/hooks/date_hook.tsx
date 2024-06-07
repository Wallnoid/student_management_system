import { Member } from "@/interfaces/Member";
import { useState } from "react";
import { DateValue, parseDate } from "@internationalized/date";
import { Proyecto } from "@/interfaces/Proyecto";
import { currentDate } from "@/components/shared/table/constants/date_constants";

export function dateInicioHook(actualDate: Date, project: Proyecto) {


  const [fecha, setFecha] = useState<DateValue>(
    parseDate(project?.fecha_inicio || currentDate)
  );

  return { fecha, setFecha };
}

export function dateFinalHook(actualDate: Date, project: Proyecto | null) {
  const currentDate: string = `${actualDate.getFullYear()}-${(
    actualDate.getMonth() + 2
  )
    .toString()
    .padStart(2, "0")}-${actualDate.getDate().toString().padStart(2, "0")}`;

  const [fechaFinal, setFechaFinal] = useState<DateValue>(
    parseDate(project?.fecha_fin || currentDate)
  );

  return { fechaFinal, setFechaFinal };
}
