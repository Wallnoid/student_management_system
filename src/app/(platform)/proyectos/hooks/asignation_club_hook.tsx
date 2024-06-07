import { getClubesAsignacionProyectos } from "@/services/proyectos.service";
import { ReactElement, useEffect, useState } from "react";
import { Clubes } from "../components/form_modal";
import { createObject } from "../constants/constants";

export default function ClubElementHook() {
  const [clubElements, setClubElements] = useState<ReactElement[]>([]);

  useEffect(() => {
    getClubesAsignacionProyectos()
      .then((data) => {
        const elements = data.map((club: Clubes) => createObject(club));

        setClubElements(elements);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { clubElements, setClubElements };
}
