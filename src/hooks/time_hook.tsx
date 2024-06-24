import { useState } from "react";
import {
  DateValue,
  parseDate,
  parseTime,
  TimeFields,
} from "@internationalized/date";
import { actualDate, currentTime } from "@/constants/date_constants";
import { TimeInputValue } from "@nextui-org/react";

export function timeInicioHook(time_inicio: string) {
  const [time, setTime] = useState<TimeInputValue>(
    parseTime(time_inicio || currentTime)
  );

  return { time, setTime };
}

export function timeFinalHook(time_fin: string) {
  const newDate = new Date(actualDate.getTime());

  // Sumar una hora
  newDate.setHours(newDate.getHours() + 1);

  // Formatear la nueva hora
  const currentTimeFinal = `${newDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${newDate.getMinutes().toString().padStart(2, "0")}`;

  const [timeFinal, setTimeFinal] = useState<TimeInputValue>(
    parseTime(time_fin || currentTimeFinal)
  );

  return { timeFinal, setTimeFinal };
}
