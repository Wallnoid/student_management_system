import { ClubInternos } from "@/interfaces/ClubInternos";
import { Member } from "@/interfaces/Member";
import { Proyecto } from "@/interfaces/Proyecto";
import { SortDescriptor } from "@nextui-org/react";
import { useMemo } from "react";

export function sortedItemsMemberHook(
  items: Member[],
  sortDescriptor: SortDescriptor
) {
  return useMemo(() => {
    try {
      return [...items!].sort((a: Member, b: Member) => {
        const first = a[sortDescriptor.column as keyof Member] as string;
        const second = b[sortDescriptor.column as keyof Member] as string;
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    } catch (e) {
      console.log(e);
    }
  }, [sortDescriptor, items]);
}

export function sortedItemsProjectHook(
  items: Proyecto[],
  sortDescriptor: SortDescriptor
) {
  return useMemo(() => {
    try {
      return [...items!].sort((a: Proyecto, b: Proyecto) => {
        const first = a[sortDescriptor.column as keyof Proyecto] as string;
        const second = b[sortDescriptor.column as keyof Proyecto] as string;
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    } catch (e) {
      console.log(e);
    }
  }, [sortDescriptor, items]);
}

export function sortedItemsClubesHook(
  items: ClubInternos[],
  sortDescriptor: SortDescriptor
) {
  return useMemo(() => {
    try {
      return [...items!].sort((a: ClubInternos, b: ClubInternos) => {
        const first = a[sortDescriptor.column as keyof ClubInternos] as string;
        const second = b[sortDescriptor.column as keyof ClubInternos] as string;
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    } catch (e) {
      console.log(e);
    }
  }, [sortDescriptor, items]);
}
