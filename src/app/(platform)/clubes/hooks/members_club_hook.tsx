import { getClubesAsignacionProyectos } from "@/services/proyectos.service";
import { ReactElement, useEffect, useState } from "react";
import { Clubes, PresidenteWithRole } from "@/types/types";
import { createObject } from "../constants/constants";
import { getMembersClub } from "@/services/clubes.service";
import { Member } from "@/interfaces/Member";
import DefaultAvatar from "@/components/shared/Avatar";

export default function MemberClubHook(idClub: string, selectedMember: string) {
  const [clubMembers, setClubMembers] = useState<ReactElement[]>([]);

  useEffect(() => {
    getMembersClub(idClub)
      .then((data: any) => {
        if (!data) {
          return;
        }
        console.log(data);
        const elements = (data as Member[]).map((member: Member) => (
          <DefaultAvatar key={member.id} user={member} />
        ));

        console.log("Miembros del club");
        console.log(elements);
        setClubMembers(elements);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedMember]);

  return { clubMembers, setClubMembers };
}
