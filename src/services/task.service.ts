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
    let { error } = await supabase()
        .rpc('agregar_tarea', {
            'comentario':comentario ?? '',
            'creado_por':creado_por,
            'descripcion':descripcion,
            'fecha_fin':fecha_fin,
            'fecha_inicio':fecha_inicio,
            'nombre':nombre,
            'id_proyecto':id_proyecto,
            'responsables':responsables
        });
    if (error) {
        throw new Error('Error al intentar asignar la tarea. Intente de nuevo. Error: ' + error.message);
    }
    return true
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
    let {data, error} = await supabase().rpc('tarea_con_datos_de_miembros', { id_tarea: id });
    if (error) {
        throw new Error('Error al recuperar los datos del servidor. Intente más tarde.');
    }
    return data as Task[];
}

export async function updateTaskStatus(id: string, estado: string) {
    let { error } = await supabase()
        .from('tareas')
        .update({ estado: estado })
        .eq('id', id);
    if (error) {
        throw new Error('Error al actualizar estado de la tarea seleccionada. Intente más tarde.');
    }
    return true;
}

export async function updateTask(tarea: Task) {
    const { id, comentario, descripcion, fecha_fin, fecha_inicio, nombre, id_proyecto, actualizado_por, estado } = tarea
    const { error } = await supabase()
        .from('tareas')
        .update({
            estado,
            comentario,
            descripcion,
            fecha_fin,
            fecha_inicio,
            nombre,
            id_proyecto,
            actualizado_por,
            fecha_hora_actualizacion: 'NOW()'
        })
        .eq('id', id)
        .select();
    if (error) {
        throw new Error('Error al actualizar la información de la tarea seleccionada. Intente más tarde.');
    }
    return true;
}

export async function agregarResponsable(miembro: AsignacionesTareas) {
    const { id_tarea, id_miembro, comentario, creado_por  } = miembro
    const { error } = await supabase()
        .from('asignaciones_tareas')
        .insert(
            { id_tarea, id_miembro, comentario, creado_por, fecha_hora_creacion: 'NOW()' },
        )
        .select();
    if (error) {
        throw new Error('Error al intentar agregar responsable a la tarea seleccionada. Intente de nuevo. Error: ' + error.message);
    }
    return true;
}

export async function actualizarResponsable(miembro: AsignacionesTareas) {
    const { id, id_miembro, comentario, actualizado_por } = miembro
    const { error } = await supabase()
        .from('asignaciones_tareas')
        .update(
            { id_miembro, comentario, actualizado_por, fecha_hora_actualizacion: 'NOW()' },
        )
        .eq('id', id);
    if (error) {
        console.error("Error updating responsible:", error);
        throw new Error('Error al actualizar la información de la asignación de tarea seleccionada.');
    }
    return true;
}
export async function eliminarResponsable(id: string) {
    const { error } = await supabase()
        .from('asignaciones_tareas')
        .delete()
        .eq('id', id);
    if (error) {
        console.error("Error deleting responsible:", error);
        throw new Error('Error al intentar eliminar una tarea seleccionada. Intete de nuevo.');
    }
    return true;
}