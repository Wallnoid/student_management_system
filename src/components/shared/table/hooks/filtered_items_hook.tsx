import { Member } from "@/interfaces/Member";
import { useMemo } from "react";
import { Selection } from "@nextui-org/react";
import { StatusOptionsType } from "@/app/types/types";
import { Proyecto } from "@/interfaces/Proyecto";

export function filteredItemsMemberHook(
  filterValue: string,
  statusFilter: Selection,
  members: Member[],
  MembersStatusOptions: StatusOptionsType[]
) {
  const hasSearchFilter = Boolean(filterValue);

  return useMemo(() => {
    try {
      let filteredUsers = [...members];

      if (hasSearchFilter) {
        filteredUsers = filteredUsers.filter(
          (user) =>
            user.nombre.toLowerCase().includes(filterValue.toLowerCase()) ||
            user.nro_identificacion
              .toLowerCase()
              .includes(filterValue.toLowerCase()) ||
            user.apellido.toLowerCase().includes(filterValue.toLowerCase())
        );
      }
      if (
        statusFilter !== "all" &&
        Array.from(statusFilter).length !== MembersStatusOptions.length
      ) {
        filteredUsers = filteredUsers.filter((user) =>
          Array.from(statusFilter).includes(user.estado)
        );
      }

      return filteredUsers;
    } catch (e) {
      console.log(e);
    }
  }, [members, filterValue, statusFilter]);
}
///////////////////////
export function filteredItemsProjectHook(
  filterValue: string,
  statusFilter: Selection,
  projects: Proyecto[],
  projectsStatusOptions: StatusOptionsType[]
) {
  const hasSearchFilter = Boolean(filterValue);

  return useMemo(() => {
    try {
      let filteredUsers = [...projects];

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
  }, [projects, filterValue, statusFilter]);
}
