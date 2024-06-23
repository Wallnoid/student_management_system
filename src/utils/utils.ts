import { format, parseISO } from "date-fns";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function cutString(str: string, length: number) {
  if (!str) {
    return "";
  }

  if (str.length > length) {
    return str.slice(0, length) + "...";
  }
  return str;
}

//FECHAS
export function formatDate(date: string) {
  return format(parseISO(date), "dd/MM/yyyy");
}

export function formatDateTime(date: string) {
  return format(parseISO(date), "dd/MM/yyyy HH:mm");
}

export function parseDate(date: string) {
  return format(parseISO(date), "yyyy-MM-dd");
}

export function getUrl() {
  return window.location.href;
}
