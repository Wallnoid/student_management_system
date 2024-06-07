import { Member } from "@/interfaces/Member";
import { useState } from "react";
import { DateValue, parseDate } from "@internationalized/date";

export default function dateHook(actualDate: Date, member: Member | null) {
  const currentDate: string = `${actualDate.getFullYear()}-${(
    actualDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${actualDate.getDate().toString().padStart(2, "0")}`;

  const [fecha, setFecha] = useState<DateValue>(
    parseDate(member?.fecha_nacimiento || currentDate)
  );

  return { fecha, setFecha };
}
