import { Proyecto } from "@/interfaces/Proyecto";
import {createClient as supabase} from "@/supabase/client";

let currentUser = null;

supabase().auth.onAuthStateChange((event, session) => {
    if (session) {
        currentUser = session;
    }
});

export async function getProyectos(){
    let { data, error } = await supabase()
    .rpc('get_proyectos')
    if (error) console.error(error)
    else console.log(data)

    return data as Proyecto;
}

export async function ingresarProyecto(proyecto: Proyecto){
    const project = await supabase().from('proyectos').insert(proyecto);
    if (project.error) {
        console.log("Error al insertar proyecto." + project.error.message)
        return false;
    }
    return true;
}

export async function actualizarProyecto(id:string, proyecto:Proyecto){
    const userTable = await supabase().from('proyectos').update({
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        fecha_inicio: proyecto.fecha_inicio,
        fecha_fin: proyecto.fecha_fin,
        estado: proyecto.estado,
        responsable: proyecto.responsable,
        actualizado_por: currentUser!.user.id,
        fecha_hora_actualizacion: Date.now()
        }).eq('id', id);

    if (userTable.error) {
        console.log("Error al actualizar proyecto.")
        return false;
    }
    return true;
}

export async function actualizarEstadoProyecto(id: string, estado: string){
    let {error} = await supabase()
    .from('miembros')
    .update({estado: estado})
    .eq('id',id);

    if (error) {
        console.log("Error al actualizar estado del proyecto.")
        return false;
    }
    return true;
}