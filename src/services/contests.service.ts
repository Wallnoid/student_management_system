import { createClient as supabase } from '@/supabase/client'; 
import { Contest } from '@/interfaces/Contest';

export async function addContest(contest: Contest): Promise<boolean> {
    const {nombre, descripcion, responsable, id_evento ,cantidad_participantes, creado_por } = contest;
    let { error } = await supabase()
        .from('concurso')
        .insert({
            nombre,
            descripcion,
            responsable, 
            cantidad_participantes,
            creado_por,
            id_evento,
            fecha_hora_creacion: 'NOW()'
        })
        .select();
    if (error) {
        throw new Error('Error al intentar agregar un concurso al evento seleccionado. Intente de nuevo. Error: ' + error.message);
    }
    return true;
}

export async function updateContest(contest: Contest): Promise<boolean>{
    const {id, nombre, descripcion, responsable, cantidad_participantes, actualizado_por, estado } = contest;
    let { error } = await supabase()
        .from('concurso')
        .update({
            nombre,
            descripcion,
            responsable, 
            estado,
            cantidad_participantes,
            actualizado_por,
            fecha_hora_actualizacion: 'NOW()'
        })
        .eq('id', id)
        .select();
    if (error) {
        throw new Error('Error al intentar actualizar el concurso seleccionado. Intente de nuevo. Error: ' + error.message);
    }
    return true;
}

export async function getContests(id_evento: string){
    let { data, error } = await supabase()
    .rpc('get_contests', {
        evento_id: id_evento
    });
    if (error) throw new Error('Error al intentar recuperar todos los clubes disponibles. Rceargue la página e intente de nuevo. Error: ' + error.message);
    return data as [];
}

export async function deleteContest(contest: Contest, status: string){
    const {id,actualizado_por } = contest;
    let { error } = await supabase()
        .from('concurso')
        .update({
            estado: status,
            actualizado_por,
            fecha_hora_actualizacion: 'NOW()'
        })
        .eq('id', id)
        .select();
    if (error) {
        throw new Error('Error al intentar eliminar el concurso seleccionado. Intente de nuevo. Error: ' + error.message);
    }
    return true;
}
