import { Member } from "@/interfaces/Member";
import { useMemo } from "react";
import { Selection } from "@nextui-org/react";
import { MembersStatusOptionsType } from "@/app/types/types";

export default function filteredItemsHook(
  filterValue: string,
  statusFilter: Selection,
  members: Member[],
  MembersStatusOptions: MembersStatusOptionsType[]
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
