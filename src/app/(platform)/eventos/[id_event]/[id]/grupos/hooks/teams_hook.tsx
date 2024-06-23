import { Team } from "@/interfaces/Team";
import { getContests } from "@/services/contests.service";
import { getEvents } from "@/services/events.service";
import { getTalks } from "@/services/talks.service";
import { getTeams } from "@/services/teams.service";
import { useEffect, useState } from "react";

export default function TeamHook(loading: boolean) {
  const [team, setTeam] = useState<Team[]>([]);

  useEffect(() => {
    getTeams()
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
