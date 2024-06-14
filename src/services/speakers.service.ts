import { Speaker } from '@/interfaces/Speaker';
import { createClient as supabase } from '@/supabase/client';

export async function addSpeaker(speaker: Speaker): Promise<boolean> {
    const {nombre, apellido, nro_identificacion, correo, telefono, titulo, creado_por} = speaker;
    let { error } = await supabase()
        .from('ponentes')
        .insert({
            nombre,
            apellido,
            nro_identificacion, 
            correo,
            telefono, 
            titulo,
            creado_por,
            fecha_hora_creacion: 'NOW()'
        })
        .select();
    if (error) throw new Error('Error al intentar registrar el ponente. Intente de nuevo. Error: ' + error.message);
    return true;
}

export async function updateSpeaker(speaker: Speaker): Promise<boolean> {
    const {id, nombre, apellido, estado, nro_identificacion, correo, telefono, titulo, actualizado_por} = speaker;
    let { error } = await supabase()
        .from('ponentes')
        .update({
            nombre,
            apellido,
            nro_identificacion, 
            correo,
            telefono, 
            titulo,
            estado,
            actualizado_por,
            fecha_hora_actualizacion: 'NOW()'
        })
        .eq('id', id)
        .select();
    if (error) throw new Error('Error al intentar actualizar la información del ponente. Intente de nuevo. Error: ' + error.message);
    return true;
}

export async function getSpeakers(){
    let { data, error } = await supabase()
    .rpc('get_speakers')
    if (error) throw new Error('Error al intentar obtener los ponentes. Intente de nuevo. Error: ' + error.message);
    return data as [];
}

export async function deleteSpeaker(speaker: Speaker): Promise<boolean>{
    const {id} = speaker;
    let { error } = await supabase()
        .from('ponentes')
        .delete()
        .eq('id', id)
        .select();
    if (error) throw new Error('Error al intentar eliminar el ponente seleccionado. Intente de nuevo. Error: ' + error.message);
    return true;
}