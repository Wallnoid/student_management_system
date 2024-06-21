import { ClubInternos } from "@/interfaces/ClubInternos";
import { getClubes } from "@/services/clubes.service";
import { useEffect, useState } from "react";

export default function ClubHook(loading: boolean) {
  const [clubs, setClubs] = useState<ClubInternos[]>([]);

  useEffect(() => {
    getClubes()
      .then((data) => {
        setClubs(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loading]);

  return { clubs, setClubs };
}
