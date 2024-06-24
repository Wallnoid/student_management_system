import { Participant } from "@/interfaces/Participant";
import { createClient as supabase } from '@/supabase/client'; 

export async function addParticipant(participant: Participant):Promise<Boolean>{
    const {nombre, apellido, cedula, correo, fecha_nacimiento, telefono, creado_por} = participant;
    let { error } = await supabase()
        .from('participantes')
        .insert({
            nombre,
            apellido,
            cedula,
            correo,
            fecha_nacimiento,
            telefono,
            creado_por,
            fecha_hora_creacion : 'NOW()'
        })
        .select();
    if (error) throw new Error('Error al intentar registrar el participante. Intente de nuevo. Error: ' + error.message);
    return true;
}

export async function updateParticipant(participant: Participant): Promise<boolean>{
    const {id, nombre, apellido, telefono, actualizado_por} = participant;
    let { error } = await supabase()
        .from('participantes')
        .update({
            nombre,
            apellido,
            telefono,
            actualizado_por,
            fecha_hora_actualizacion: 'NOW()'
        })
        .eq('id', id)
        .select();
    if (error) throw new Error('Error al intentar actualizar el participante seleccionado. Intente de nuevo. Error: ' + error.message);
    return true;
}

export async function getParticipants(){
    let { data, error } = await supabase()
        .from('participantes')
        .select("*")
        .neq("estado", "eliminado");
    if (error) {
        throw new Error('Error al intentar recuperar los participantes. Intente más tarde. Error: ' + error.message);
    }
    return data as Participant[];
}

export async function deleteParticipant(estado: string, id: string): Promise<Boolean>{
    let { error } = await supabase()
    .from("participantes")
    .update({ estado: estado })
    .eq("id", id);
    if (error) {
        throw new Error('Error al eliminar el participante. Recargue la página e intente de nuevo. Error: ' + error.message);
    }
    return true;
}