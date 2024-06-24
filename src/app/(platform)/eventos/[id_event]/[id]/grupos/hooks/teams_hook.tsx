import { Team } from "@/interfaces/Team";
import { TeamAuxiliar } from "@/interfaces/TeamAuxiliar";
import { getTeams, getTeamsByContest } from "@/services/teams.service";
import { useEffect, useState } from "react";

export default function TeamHook(loading: boolean, contest_id: string) {
  const [team, setTeam] = useState<TeamAuxiliar[]>([]);

  useEffect(() => {
    getTeamsByContest(contest_id)
      .then((data) => {
        setTeam(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loading]);

  return { team, setTeam };
}
