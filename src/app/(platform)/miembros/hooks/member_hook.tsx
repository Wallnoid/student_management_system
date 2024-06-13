import { Member } from "@/interfaces/Member";
import { getMembers } from "@/services/members.service";
import { useEffect, useState } from "react";

export default function userHook(loading: boolean) {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    getMembers()
      .then((members) => {
        setMembers(members);
        console.log(members);
      })
      .catch((error) => {
        setMembers([]);
      });
  }, [loading]);

  return { users: members, setUsers: setMembers };
}
