import { Team } from "@/interfaces/Team";
import { getParticipants } from "@/services/participants.service";
import { getParticipantByTeamId, getTeams } from "@/services/teams.service";
import { useEffect, useState } from "react";

export default function MembersTeamHook(
  loading: Boolean,
  team_id: string,
  setBoolean: Function
) {
  const [teamMembers, setMembersTeam] = useState<Team[]>([]);
  
  useEffect(() => {
    console.log(team_id);
    if (!loading) return;

    getParticipantByTeamId(team_id)
      .then((data) => {
        setMembersTeam(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      setBoolean(false);
    };
  });

  return { teamMembers, setTeam: setMembersTeam };
}
