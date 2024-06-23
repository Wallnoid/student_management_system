import { createClient as supabase } from "@/supabase/client";
import { Event } from "@/interfaces/Event";

export async function addEvent(event: Event): Promise<boolean> {
  const {
    nombre,
    descripcion,
    fecha_inicio,
    fecha_fin,
    responsable,
    creado_por,
  } = event;
  let { error } = await supabase()
    .from("eventos")
    .insert({
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      responsable,
      creado_por,
      fecha_hora_creacion: "NOW()",
    })
    .select();
  if (error) {
    throw new Error("Ha ocurrido un error al intentar registrar el evento.");
  }
  return true;
}

export async function updateEvent(event: Event): Promise<boolean> {
  const {
    id,
    nombre,
    descripcion,
    fecha_inicio,
    fecha_fin,
    responsable,
    estado,
    actualizado_por,
  } = event;
  let { error } = await supabase()
    .from("eventos")
    .update({
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      estado,
      responsable,
      actualizado_por,
      fecha_hora_actualizacion: "NOW()",
    })
    .eq("id", id)
    .select();
  if (error) {
    throw new Error(
      "Ha ocurrido un error al intentar actualizar el evento. Intente de nuevo."
    );
  }
  return true;
}

export async function getEvents() {
  let { data, error } = await supabase().rpc("get_events");
  if (error)
    throw new Error(
      "Error al intentar recuperar todos los clubes disponibles. Rceargue la página e intente de nuevo."
    );
  return data as [];
}

export async function deleteEvent(
  event: Event,
  status: string
): Promise<boolean> {
  console.log(event);
  const { id, actualizado_por } = event;
  let { error } = await supabase()
    .from("eventos")
    .update({
      estado: status,
      actualizado_por,
      fecha_hora_actualizacion: "NOW()",
    })
    .eq("id", id)
    .select();
  if (error) {
    console.log(error);
    throw new Error(
      "Ha ocurrido un error al intentar eliminar el evento. Intente de nuevo."
    );
  }
  return true;
}

//función para obtener la información de un evento mediante el id

export async function getEventInfoById(id: string) {
  let { data, error } = await supabase().rpc("get_event_info_by_id", {
    event_id: id,
  });
  if (error)
    throw new Error(
      "Error al intentar recuperar la información del evento seleccionado. Error: " +
        error.message
    );
  return data as [];
}
