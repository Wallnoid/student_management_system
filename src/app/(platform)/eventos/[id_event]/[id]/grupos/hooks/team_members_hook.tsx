import { AsignacionesEquipos } from "@/interfaces/AsignacionesEquipos";
import { Participant } from "@/interfaces/Participant";
import { Team } from "@/interfaces/Team";
import { getParticipants } from "@/services/participants.service";
import { getAssignmentInfoByTeamId, getTeams } from "@/services/teams.service";
import { TeamResponse } from "@/types/types";
import { useEffect, useState } from "react";

export default function MembersTeamHook(
  loading: Boolean,
  team_id: string,
  setBoolean: Function
) {
  const [teamMembers, setMembersTeam] = useState<TeamResponse>(null);

  useEffect(() => {
    if (!loading) return;

    getAssignmentInfoByTeamId(team_id)
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

  function getMember() {
    console.log();
    console.log(teamMembers.participantes);
  }

  return { teamMembers, setMembersTeam, getMember };
}
