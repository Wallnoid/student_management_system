import { getClubesAsignacionProyectos } from "@/services/proyectos.service";
import { ReactElement, useEffect, useState } from "react";
import {
  Clubes,
  ClubMember,
  PresidenteWithRole,
  RespondClubMember,
} from "@/types/types";
import { createObject } from "../constants/constants";
import { getMembersClub } from "@/services/clubes.service";
import { Member } from "@/interfaces/Member";
import DefaultAvatar from "@/components/shared/Avatar";

export default function MemberClubHook(
  idClub: string,
  boolean: Boolean,
  setBoolean: Function
) {
  const [clubMembers, setClubMembers] = useState<ReactElement[]>([]);
  const [president, setPresident] = useState<ReactElement>(null);

  useEffect(() => {
    getMembersClub(idClub)
      .then((data: any) => {
        if (!data.presidente) {
          return;
        }

        const president = (
          <DefaultAvatar key={data.presidente.id} user={data.presidente} />
        );
        setPresident(president);

        if (!data.miembros) {
          return;
        }

        const elements = (data.miembros as RespondClubMember[]).map(
          (member: RespondClubMember) => (
            <DefaultAvatar key={member.id} user={member.miembro_club} />
          )
        );

        setClubMembers(elements);

        //console.log(elements);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      setBoolean(false);
    };
  }, [boolean]);

  return { clubMembers, setClubMembers, president, setPresident };
}
