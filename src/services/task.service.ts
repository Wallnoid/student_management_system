import { createClient as supabase } from "@/supabase/client";
import { Task } from "@/interfaces/Task";
import { AsignacionesTareas } from "@/interfaces/AsignacionesTareas";
let currentUser = null;

supabase().auth.onAuthStateChange((event, session) => {
    if (session) {
        currentUser = session;
    } else {
        currentUser = null;
    }
});

export async function insertTasksAndAssignments(tarea: Task) {
    const { comentario, creado_por, descripcion, fecha_fin, fecha_inicio, nombre, id_proyecto, responsables } = tarea
    let { data, error } = await supabase()
        .rpc('agregar_tarea', {
            'comentario':comentario ?? '',
            //uid de la sesion
            'creado_por':creado_por,
            'descripcion':descripcion,
            'fecha_fin':fecha_fin,
            'fecha_inicio':fecha_inicio,
            'nombre':nombre,
            'proyecto':id_proyecto,
            'responsables':responsables
        })
    if (error) {
        console.error(error)
        return error.code
    }
    else {
        console.log(data)
        return true
    }
}

export async function getTaskByProject(proyecto: string) {
    console.log(proyecto)
    let {data, error} = await supabase().from('tareas').select('*').eq('id_proyecto', proyecto)
    if (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
    return data as Task[];
}

export async function getTasks() {
    let { data, error } = await supabase()
        .from('tareas')
        .select('*')
        .neq('estado', 'eliminado')
    if (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
    return data as Task[];
}
export async function getTaskById(id: string) {
    let task = await supabase().rpc('tarea_con_datos_de_miembros', { id })
    return task.data as Task[];
}
//usar para eliminar tambien
export async function updateTaskStatus(id: string, estado: string) {
    let { error } = await supabase()
        .from('tareas')
        .update({ estado: estado })
        .eq('id', id);
    if (error) {
        console.log("Error al actualizar estado.")
        return false;
    }
    return true;
}
export async function updateTask(tarea: Task) {
    const { comentario, descripcion, fecha_fin, fecha_inicio, nombre, id_proyecto, actualizado_por, estado } = tarea
    const { data, error } = await supabase()
        .from('tareas')
        .update({
            estado,
            comentario,
            descripcion,
            fecha_fin,
            fecha_inicio,
            nombre,
            id_proyecto,
            actualizado_por: actualizado_por,
            fecha_hora_actuación: 'NOW()'
        })
        .eq('some_column', 'someValue')
        .select()
    if (error) {
        console.error("Error updating task:", error);
        return false;
    }
    return true;
}
export async function añadirResponsable(miembro: AsignacionesTareas) {
    const { id_tarea, id_miembro, comentario, creado_por, fecha_hora_creacion, actualizado_por, fecha_hora_actuacion } = miembro
    const { data, error } = await supabase()
        .from('asignaciones_tareas')
        .insert([
            { id_tarea, id_miembro, comentario, creado_por, fecha_hora_creacion, actualizado_por, fecha_hora_actuacion },
        ])
        .select()
    if (error) {
        console.error("Error adding responsible:", error);
        return false;
    }
}
export async function actualizarResponsable(miembro: AsignacionesTareas) {
    const { id, id_miembro, comentario, actualizado_por, fecha_hora_actuacion } = miembro
    const { data, error } = await supabase()
        .from('asignaciones_tareas')
        .update([
            { id_miembro, comentario, actualizado_por, fecha_hora_actuacion },
        ])
        .eq('id', id)
    if (error) {
        console.error("Error updating responsible:", error);
        return false;
    }
}
export async function eliminarResponsable(id: string) {
    const { data, error } = await supabase()
        .from('asignaciones_tareas')
        .delete()
        .eq('id', id)
    if (error) {
        console.error("Error deleting responsible:", error);
        return false;
    }
}