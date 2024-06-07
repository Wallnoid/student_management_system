import { Member } from "@/interfaces/Member";
import { Proyecto } from "@/interfaces/Proyecto";
import { useMemo } from "react";

export function itemsMemberHook(
  page: number,
  rowsPerPage: number,
  filteredItems: Member[]
) {
  return useMemo(() => {
    try {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return filteredItems!.slice(start, end);
    } catch (e) {
      console.log(e);
    }
  }, [page, filteredItems, rowsPerPage]);
}

export function itemsProjectHook(
  page: number,
  rowsPerPage: number,
  filteredItems: Proyecto[]
) {
  return useMemo(() => {
    try {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return filteredItems!.slice(start, end);
    } catch (e) {
      console.log(e);
    }
  }, [page, filteredItems, rowsPerPage]);
}
