import { ClubInternos } from "@/interfaces/ClubInternos";
import { Member } from "@/interfaces/Member";
import { Proyecto } from "@/interfaces/Proyecto";
import { useMemo } from "react";

export function itemsHook(
  page: number,
  rowsPerPage: number,
  filteredItems: any[]
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
