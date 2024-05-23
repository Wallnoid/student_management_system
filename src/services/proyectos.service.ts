import { Proyecto } from "@/interfaces/Proyecto";
import { createClient as supabase } from "@/supabase/client";

let currentUser = null;

supabase().auth.onAuthStateChange((event, session) => {
  if (session) {
    currentUser = session;
  }
});

export async function getSingleProject(id: String) {
  let { data, error } = await supabase().rpc("get_proyectos");
  let proyecto = data.find((proyecto: Proyecto) => proyecto.id === id);
  if (error) console.error(error);
  else console.log(proyecto);
  return proyecto as Proyecto;
}

export async function getProyectos() {
  let { data, error } = await supabase().rpc("get_proyectos");
  if (error){ 
    throw new Error('Error al recuperar datos del servidor. Intente de nuevo.');
  }
  return data as Proyecto[];
}

export async function ingresarProyecto(proyecto: Proyecto) {
  let { error } = await supabase()
    .from("proyectos")
    .insert(proyecto)
    .select();
  if (error) {
    throw new Error('Error al intentar registrar un proyecto. Recargue la página e intente nuevamente.');
  }
  return true;
}

export async function actualizarProyecto(proyecto: Proyecto) {
  const {id, nombre, descripcion, fecha_inicio, fecha_fin, estado, responsable, actualizado_por} = proyecto;
  let { error } = await supabase()
    .from("proyectos")
    .update({
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      estado,
      responsable,
      actualizado_por,
      fecha_hora_actualizacion: 'NOW()'
    })
    .eq("id", id);
  if (error) {
    throw new Error("Ha ocurrido un error al intentar actualizar la información del proyecto. Intente de nuevo.");
  }
  return true;
}
//Eliminar
export async function actualizarEstadoProyecto(id: string, estado: string) {
  let { error } = await supabase()
    .from("proyectos")
    .update({ estado: estado })
    .eq("id", id);
  if (error) {
    throw new Error('Ha ocurrido un error al intentar eliminar el proyecto seleccionado. Intente de nuevo.');
  }
  return true;
}

export async function getClubesAsignacionProyectos() {
  let { data, error } = await supabase().rpc("get_clubes_asignacion");
  if (error){ 
    throw new Error('Error al recuperar los datos del servidor. Recargue la página e intente de nuevo.');
  }
  return data;
}
