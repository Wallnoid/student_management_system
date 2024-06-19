import { getClubesAsignacionProyectos } from "@/services/proyectos.service";
import { ReactElement, useEffect, useState } from "react";
import { createObject } from "../constants/constants";
import { Clubes } from "@/types/types";

export default function ClubElementHook() {
  const [clubElements, setClubElements] = useState<ReactElement[]>([]);

  useEffect(() => {
    getClubesAsignacionProyectos()
      .then((data) => {
        console.log("CLUBES ASIGNACION PROYECTOS:");
        console.log(data);
        const elements = data.map((club: Clubes) => createObject(club));

        setClubElements(elements);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { clubElements, setClubElements };
}
