import { Member } from "@/interfaces/Member";
import { Talk } from "@/interfaces/Talk";
import { createClient as supabase } from "@/supabase/client";

export async function addTalk(talk: Talk): Promise<boolean> {
  const {
    nombre,
    descripcion,
    id_evento,
    fecha,
    lugar,
    hora_inicio,
    hora_fin,
    creado_por,
  } = talk;
  let { error } = await supabase()
    .from("charlas")
    .insert({
      nombre,
      descripcion,
      id_evento,
      fecha,
      lugar,
      hora_inicio,
      hora_fin,
      creado_por,
      fecha_hora_creacion: "NOW()",
    })
    .select();
  if (error)
    throw new Error(
      "Error al intentar registrar la charla. Intente de nuevo. Error: " +
        error.message
    );
  return true;
}
//función para crear una charla a la vez que se asignan ponentes a la misma
export async function addTalkWithSpeakers(talk: Talk): Promise<boolean> {
  const {
    nombre,
    descripcion,
    id_evento,
    fecha,
    lugar,
    hora_inicio,
    hora_fin,
    creado_por,
    ponentes,
    observaciones,
    precios,
  } = talk;
  let { data, error } = await supabase().rpc("agregar_charla", {
    creado_por,
    descripcion,
    fecha,
    hora_fin,
    hora_inicio,
    id_evento,
    lugar,
    nombre,
    observaciones,
    ponentes,
    precios,
  });
  if (error)
    throw new Error(
      "Error al intentar registrar la charla. Intente de nuevo. Error: " +
        error.message
    );
  if (data === "ok") return true;
}
/*
export async function addSpeakersToTalk(ponentes: string[], precios: number[],  creado_por: string, id_charla: string, observaciones: string[], id_evento:string): Promise<boolean> {
    let { data, error } = await supabase()
    .rpc('agregar_ponentes_a_charla', {
        creado_por, 
        id_charla, 
        observaciones, 
        ponentes, 
        precios,
        id_evento
    })
    if (error) throw new Error('Error al intentar asignar ponente/s a la charla. Intente de nuevo. Error: ' + error.message);
    if (data === 'ok') return true;
}*/

export async function updateTalk(talk: Talk): Promise<boolean> {
  const {
    id,
    nombre,
    descripcion,
    id_evento,
    estado,
    fecha,
    lugar,
    hora_inicio,
    hora_fin,
    actualizado_por,
  } = talk;
  let { error } = await supabase()
    .from("charlas")
    .update({
      nombre,
      descripcion,
      id_evento,
      estado,
      fecha,
      lugar,
      hora_inicio,
      hora_fin,
      actualizado_por,
      fecha_hora_actualizacion: "NOW()",
    })
    .eq("id", id)
    .select();

  if (error)
    throw new Error(
      "Error al intentar actualizar la charla seleccionada. Intente de nuevo. Error: " +
        error.message
    );
  return true;
}

export async function getTalks() {
  let { data, error } = await supabase().rpc("get_talks");
  if (error)
    throw new Error(
      "Error al intentar obtener las charlas. Intente de nuevo. Error: " +
        error.message
    );
  return data as [];
}

export async function getTalkById(talk_id: string) {
  let { data, error } = await supabase().rpc("get_talkbyid", { talk_id });
  if (error)
    throw new Error(
      "Error al intentar obtener la charla seleccionada. Intente de nuevo. Error: " +
        error.message
    );
  return data as Talk[];
}

export async function getTalksByEventId(evento_id: string) {
  let { data, error } = await supabase().rpc("get_talk_by_event_id", {
    evento_id,
  });
  if (error)
    throw new Error(
      "Error al intentar obtener las charlas del evento seleccionado. Intente de nuevo. Error: " +
        error.message
    );
  return data as [];
}

export async function deleteTalk(talk: Talk, estado: string): Promise<boolean> {
  const { id } = talk;
  let { error } = await supabase()
    .from("charlas")
    .update({
      estado,
      fecha_hora_actualizacion: "NOW()",
    })
    .eq("id", id)
    .select();
  if (error)
    throw new Error(
      "Error al intentar eliminar la charla seleccionada. Intente de nuevo. Error: " +
        error.message
    );
  return true;
}
