import { AsignacionesEquipos } from "@/interfaces/AsignacionesEquipos";
import { Member } from "@/interfaces/Member";
import { Team } from "@/interfaces/Team";
import { createClient as supabase } from "@/supabase/client";
import { getTeamsParticipationsByContest } from "./participations.service";
import { Participation } from "@/interfaces/Participation";
import { Participante } from "@/interfaces/participante";
import { As } from "@nextui-org/react";
import { Participant } from "@/interfaces/Participant";
import { TeamResponse } from "@/types/types";

export async function addTeam(team: Team): Promise<boolean> {
  const { nombre, cant_integrantes, creado_por } = team;
  let { error } = await supabase()
    .from("equipos")
    .insert({
      nombre,
      cant_integrantes,
      creado_por,
      fecha_hora_creacion: "NOW()",
    })
    .select();
  if (error) {
    throw new Error(
      "Error al intentar registrar el equipo. Intente de nuevo. Error: " +
        error.message
    );
  }
  return true;
}

export async function addTeamParticipation(
  team: Team,
  id_contest: string,
  costo: number
): Promise<boolean> {
  const { nombre, cant_integrantes, creado_por } = team;
  let { error, data } = await supabase()
    .from("equipos")
    .insert({
      nombre,
      cant_integrantes,
      creado_por,
      fecha_hora_creacion: "NOW()",
    })
    .select("id");
  let id_team = data[0].id;
  let participacion: Participation = {
    observacion: "Participación en concurso",
    id_concurso: id_contest,
    id_equipo: id_team,
    valor_participacion: costo,
    creado_por: creado_por,
    fecha_hora_creacion: "NOW()",
  };
  let { error: error2 } = await supabase()
    .from("participaciones")
    .insert(participacion)
    .select();
  if (error2)
    throw new Error(
      "Error al intentar registrar la participación del equipo. Intente de nuevo. Error: " +
        error.message
    );
  if (error)
    throw new Error(
      "Error al intentar registrar el equipo. Intente de nuevo. Error: " +
        error.message
    );

  return true;
}

export async function updateTeam(team: Team): Promise<boolean> {
  const { id, nombre, cant_integrantes, capitan, estado, actualizado_por } =
    team;
  let { error } = await supabase()
    .from("equipos")
    .update({
      nombre,
      cant_integrantes,
      capitan,
      estado,
      actualizado_por,
      fecha_hora_actualizacion: "NOW()",
    })
    .eq("id", id)
    .select();
  if (error) {
    throw new Error(
      "Error al intentar actualizar la información el equipo. Intente de nuevo. Error: " +
        error.message
    );
  }
  return true;
}

export async function getTeams() {
  let { data, error } = await supabase().rpc("get_teams");
  if (error)
    throw new Error(
      "Error al intentar recuperar los equipos. Intente de nuevo. Error: " +
        error.message
    );
  return data as [];
}

export async function getTeamsByContest(concurso_id: string): Promise<Team[]> {
  return getTeamsParticipationsByContest(concurso_id)
    .then((participaciones: Participation[]) => {
      let teams: Team[] = [];
      for (let i = 0; i < participaciones.length; i++) {
        teams.push(participaciones[i].id_equipo as Team);
      }
      return teams;
    })
    .catch((error) => {
      throw new Error("Error al obtener los equipos. Error: " + error.message);
    });
}

export async function getMembersByTeam(
  team_id: string
): Promise<Participante[]> {
  let { data, error } = await supabase().rpc("get_members_by_team", {
    team_id,
  });
  if (error)
    throw new Error(
      "Error al intentar obtener los miembros del equipo seleccionado. Intente de nuevo. Error: " +
        error.message
    );
  return data as Participante[];
}

export async function deleteTeam(team: Team, estado: string): Promise<boolean> {
  const actualizado_por = (team.actualizado_por as Member).id;
  const { id } = team;
  let { error } = await supabase()
    .from("equipos")
    .update({
      estado: estado,
      actualizado_por,
      fecha_hora_actualizacion: "NOW()",
    })
    .eq("id", id)
    .select();
  if (error)
    throw new Error(
      "Error al intentar eliminar el equipo seleccionado. Intente de nuevo. Error: " +
        error.message
    );
  return true;
}

//asignaciones de miembros a equipos

export async function addMemberToTeam(
  asignacion: AsignacionesEquipos
): Promise<boolean> {
  const { id_miembro, id_equipo, observacion, creado_por } = asignacion;
  let { error } = await supabase()
    .from("asignaciones_miembros_equipos")
    .insert({
      id_miembro,
      id_equipo,
      observacion,
      creado_por,
      fecha_hora_creacion: "NOW()",
    })
    .select();
  if (error)
    throw new Error(
      "Error al intentar agregar un miembro al equipo seleccionado. Intente de nuevo. Error: " +
        error.message
    );
  return true;
}

// obtener la info de un equipo mediante el ID

export async function getAssignmentInfoByTeamId(id_team: string) {
  let { data, error } = await supabase().rpc("get_team_info_by_id", {
    id_team,
  });
  if (error)
    throw new Error(
      "Error al intentar obtener la información del equipo seleccionado. Intente de nuevo. Error: " +
        error.message
    );
  return data as TeamResponse;
}

// export async function getParticipantByTeamId(
//   id_team: string
// ): Promise<Participant[]> {
//   return getAssignmentInfoByTeamId(id_team)
//     .then((asignaciones: AsignacionesEquipos) => {
//       let participantes = (asignaciones.participante as Participant)
//       console.log(participantes)
//       return participantes;
//     })
//     .catch((error) => {
//       throw new Error(
//         "Error al obtener los participantes del equipo. Error: " + error.message
//       );
//     });
// }

// designar un capitan de equipo

export async function captainAssignment(
  id_team: string,
  id_participant: string
): Promise<Boolean> {
  let { error } = await supabase()
    .from("equipos")
    .update({
      capitan: id_participant,
    })
    .eq("id", id_team)
    .select();
  if (error)
    throw new Error(
      "Error al intentar designar el capitán del equipo. Intente de nuevo. Error: " +
        error.message
    );
  return true;
}
