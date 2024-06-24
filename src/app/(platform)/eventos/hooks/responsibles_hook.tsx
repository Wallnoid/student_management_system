import { getClubesAsignacionProyectos } from "@/services/proyectos.service";
import { ReactElement, useEffect, useState } from "react";
import { Clubes, PresidenteWithRole } from "@/types/types";
import { createObject } from "../constants/constants";
import { getMembers } from "@/services/members.service";

export default function ResponsiblesHook() {
  const [responsibles, setResponsibles] = useState<ReactElement[]>([]);

  useEffect(() => {
    getMembers()
      .then((data: any) => {
        const elements = (data as PresidenteWithRole[]).map(
          (presidente: PresidenteWithRole) => createObject(presidente)
        );
        // console.log(elements);

        setResponsibles(elements);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { responsibles, setResponsibles };
}
