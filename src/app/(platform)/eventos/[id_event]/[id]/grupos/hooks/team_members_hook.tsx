import { Team } from "@/interfaces/Team";
import { getParticipants } from "@/services/participants.service";
import { getTeams } from "@/services/teams.service";
import { useEffect, useState } from "react";

export default function TeamHook(loading: boolean) {
  const [teamMembers, setTeam] = useState<Team[]>([]);

  useEffect(() => {
    getParticipants()
      .then((data) => {
        setTeam(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loading]);

  return { teamMembers, setTeam };
}
