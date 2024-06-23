import { AsignacionesEquipos } from "@/interfaces/AsignacionesEquipos";
import { Member } from "@/interfaces/Member";
import { Team } from "@/interfaces/Team";
import { createClient as supabase } from "@/supabase/client";
import { getTeamsParticipationsByContest } from "./participations.service";
import { Participation } from "@/interfaces/Participation";

export async function addTeam(team: Team): Promise<boolean> {
    const {nombre, cant_integrantes, capitan, creado_por} = team;
    let { error } = await supabase()
        .from('equipos')
        .insert({
            nombre,
            cant_integrantes,
            capitan,
            creado_por,
            fecha_hora_creacion: 'NOW()'
        })
        .select();
    if (error) {
        throw new Error('Error al intentar registrar el equipo. Intente de nuevo. Error: ' + error.message);
    }
    return true;
}

export async function updateTeam(team: Team): Promise<boolean> {
    const {id, nombre, cant_integrantes, capitan, estado, actualizado_por} = team;
    let { error } = await supabase()
        .from('equipos')
        .update({
            nombre,
            cant_integrantes,
            capitan,
            estado,
            actualizado_por,
            fecha_hora_actualizacion: 'NOW()'
        })
        .eq('id', id)
        .select();
    if (error) {
        throw new Error('Error al intentar actualizar la información el equipo. Intente de nuevo. Error: ' + error.message);
    }
    return true;
}

export async function getTeams(){
    let { data, error } = await supabase()
        .rpc('get_teams')
    if (error) throw new Error('Error al intentar recuperar los equipos. Intente de nuevo. Error: ' + error.message);
    return data as [];
}

export async function getTeamsByContest(concurso_id: string): Promise<Team[]> {
    return getTeamsParticipationsByContest(concurso_id).then((participaciones: Participation[]) => {
        let teams: Team[] = [];
        for (let i = 0; i < participaciones.length; i++) {
            teams.push(participaciones[i].id_equipo as Team);
        }
        return teams;
    }).catch((error) => {
        throw new Error('Error al obtener los equipos. Error: ' + error.message);
    });
}

export async function deleteTeam(team: Team, estado: string): Promise<boolean> {
    const actualizado_por = (team.actualizado_por as Member).id;
    const {id} = team;
    let { error } = await supabase()
    .from('equipos')
    .update({
        estado: estado,
        actualizado_por,
        fecha_hora_actualizacion: 'NOW()'
    })
    .eq('id', id)
    .select();
    if(error) throw new Error('Error al intentar eliminar el equipo seleccionado. Intente de nuevo. Error: ' + error.message);
    return true;
}


//asignaciones de miembros a equipos

export async function addMemberToTeam(asignacion: AsignacionesEquipos): Promise<boolean> {
    const {id_miembro, id_equipo, observacion, creado_por} = asignacion;
    let { error } = await supabase()
        .from('asignaciones_miembros_equipos')
        .insert({
            id_miembro,
            id_equipo,
            observacion,  
            creado_por,
            fecha_hora_creacion: 'NOW()'
        })
        .select(); 
    if (error) throw new Error('Error al intentar agregar un miembro al equipo seleccionado. Intente de nuevo. Error: ' + error.message);
    return true;
}

