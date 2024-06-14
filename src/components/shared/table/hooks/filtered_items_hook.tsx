import { Member } from "@/interfaces/Member";
import { useMemo } from "react";
import { Selection } from "@nextui-org/react";
import { Proyecto } from "@/interfaces/Proyecto";
import { StatusOptionsType } from "@/types/types";
import { ClubInternos } from "@/interfaces/ClubInternos";

export function filteredItemsHook(
  filterValue: string,
  statusFilter: Selection,
  clubs: any[],
  projectsStatusOptions: StatusOptionsType[]
) {
  const hasSearchFilter = Boolean(filterValue);

  return useMemo(() => {
    try {
      let filteredUsers = [...clubs];

      if (hasSearchFilter) {
        filteredUsers = filteredUsers.filter((user) =>
          user.nombre.toLowerCase().includes(filterValue.toLowerCase())
        );
      }
      if (
        statusFilter !== "all" &&
        Array.from(statusFilter).length !== projectsStatusOptions.length
      ) {
        filteredUsers = filteredUsers.filter((user) =>
          Array.from(statusFilter).includes(user.estado)
        );
      }

      return filteredUsers;
    } catch (e) {
      console.log(e);
    }
  }, [clubs, filterValue, statusFilter]);
}
