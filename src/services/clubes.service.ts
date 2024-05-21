import {createClient as supabase} from "@/supabase/client";
import {ClubInternos} from "@/interfaces/ClubInternos";
import {Member} from "@/interfaces/Member";
import {AsignacionesClubes} from "@/interfaces/AsignacionesClubes";

export async function insertClub(club: ClubInternos) {
    const    { nombre,
    descripcion,
    ubicacion,
    presidente,
    creado_por} = club


    const { data, error } = await supabase()
        .from('clubes_internos')
        .insert([
            {
                nombre,
                descripcion,
                ubicacion,
                presidente,
                estado: 'activo',
                creado_por,
                fecha_hora_creacion: 'NOW()',
                actualizado_por: creado_por,
                fecha_hora_actualizacion: 'NOW()'
            },
        ])
        .select()
    if (error) {
        console.error("Error inserting club:", error);
        return false;
    }
    return true;
}
export async function updateClub(club: ClubInternos) {
    const {id, nombre, descripcion, ubicacion, presidente, estado, actualizado_por} = club
    const { error } = await supabase()
        .from('clubes_internos')
        .update({
            nombre,
            descripcion,
            ubicacion,
            presidente,
            estado,
            actualizado_por,
            fecha_hora_actualizacion: 'NOW()'
        })
        .eq('id', id)
        .select();
    if (error) {
        console.error("Error updating club");
        console.error("Error " + error);
        return false;
    }
    return true;
}
//usar para eliminar tambien
export async function updateEstadoClub(id: string, estado: string) {
    const { error } = await supabase()
        .from('clubes_internos')
        .update({
            estado,
        })
        .eq('id', id)
        .select();
    if (error) {
        console.error("Error updating club:", error);
    }
    return true;
}
export async function getClubes(){
    const clubes = await supabase()
        .from('clubes_internos')
        .select()
    if (clubes.error) {
        console.error("Error getting clubs:", clubes.error);
    }
    return clubes.data as ClubInternos[];
}
export async function getClub(ids: string[]){
    const club = await supabase().rpc( 'club_con_datos', { ids: ids } )
    if (club.error) {
        console.error("Error getting club:", club.error);
    }
    return club.data as ClubInternos[]
}
export async function addMemberToClub(miembro : AsignacionesClubes) {
    const { id_club_interno, id_miembro, comentario_asignacion, estado, creado_por, categoria } = miembro
    const { error } = await supabase()
        .from('asignacion_miembros_clubes')
        .insert([
            {
                id_club_interno,
                id_miembro,
                comentario_asignacion,
                creado_por,
                fecha_hora_creacion: 'NOW()',
                categoria
            },
        ])
        .select();
    if (error) {
        console.error("Error adding member to club:", error);
        return false;
    }
    return true;
}
export async function updateMemberClub(miembro : AsignacionesClubes) {
    const { id, id_club_interno, id_miembro, comentario_asignacion, estado, actualizado_por, categoria } = miembro
    const { error } = await supabase()
        .from('asignacion_miembros_clubes')
        .update({
            id_club_interno,
            id_miembro,
            comentario_asignacion,
            estado,
            actualizado_por,
            fecha_hora_actualizacion: 'NOW()',
            categoria
        })
        .eq('id', id)
        .select();
    if (error) {
        console.error("Error updating member club:", error);
        return false;
    }
    return true;
}
export async function deleteMemberClub(id: string) {
    const { data, error } = await supabase()
        .from('asignacion_miembros_clubes')
        .delete()
        .eq('id', id)
        .select()
    if (error) {
        console.error("Error deleting member club:", error);
        return false;
    }
    return true;
}
export async function getMembersClub(id: string){
    const miembros = await supabase().rpc(
        'miembros_de_club',
        { id_club: id }
    )
    if (miembros.error) {
        console.error("Error getting members club:", miembros.error);
    }
    return miembros.data as Member[];
}