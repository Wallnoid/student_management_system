import { Participation } from "@/interfaces/Participation";
import { createClient as supabase } from '@/supabase/client'; 

export async function addParticipation(participation: Participation): Promise<boolean> {
    const {observacion, id_concurso, id_equipo, valor_participacion, creado_por} = participation;
    let { error } = await supabase()
        .from('participaciones')
        .insert({
            observacion,
            id_concurso, 
            id_equipo, 
            valor_participacion, 
            creado_por,
            fecha_hora_creacion: 'NOW()'
        })
        .select();
    if( error ) throw new Error('Error al intentar registrar la participación del equipo. Intente de nuevo. Error: ' + error.message);
    return true;
}

export async function getParticipations(){
    let { data, error } = await supabase()
    .rpc('get_participations')
    if (error) throw new Error('Error al intentar obtener las participaciones. Intente de nuevo. Error: ' + error.message);
    return data as []
}

// función que recupera las participaciones de un equipo en cualquier concurso.

export async function getTeamsParticipations(equipo_id: string){
    let { data, error } = await supabase()
    .rpc('get_team_participations', {
        equipo_id
    });
    if (error) throw new Error('Error al intentar recuperar las participaciones del club seleccionado. Error: ' + error.message);
    return data as [];
}

// función que recupera las participaciones de los equipos en un concurso específico.

export async function getTeamsParticipationsByContest(concurso_id: string){
    let { data, error } = await supabase()
    .rpc('get_teams_participations_by_contest', {
        concurso_id
    })
    if (error) throw new Error('Error al intentar recuperar las participaciones del concurso seleccionado.' + error.message);
    return data as [];
}