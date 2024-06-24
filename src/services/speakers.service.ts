import { AsignacionesCharlasPonente } from "@/interfaces/AsignacionesCharlas";
import { Speaker } from "@/interfaces/Speaker";
import { SpeakerAuxiliar } from "@/interfaces/SpeakerAuxiliar";
import { createClient as supabase } from "@/supabase/client";

export async function addSpeaker(speaker: Speaker): Promise<boolean> {
  const {
    nombre,
    apellido,
    nro_identificacion,
    correo,
    telefono,
    titulo,
    creado_por,
  } = speaker;
  let { error } = await supabase()
    .from("ponentes")
    .insert({
      nombre,
      apellido,
      nro_identificacion,
      correo,
      telefono,
      titulo,
      creado_por,
      fecha_hora_creacion: "NOW()",
    })
    .select();
  if (error)
    throw new Error(
      "Error al intentar registrar el ponente. Intente de nuevo. Error: " +
        error.message
    );
  return true;
}

export async function updateSpeaker(
  speaker: Speaker,
  charla_id: String,
  precio: number
): Promise<boolean> {
  const {
    id,
    nombre,
    apellido,
    estado,
    nro_identificacion,
    correo,
    telefono,
    titulo,
    actualizado_por,
  } = speaker;
  let { error } = await supabase()
    .from("ponentes")
    .update({
      nombre,
      apellido,
      nro_identificacion,
      correo,
      telefono,
      titulo,
      estado,
      actualizado_por,
      fecha_hora_actualizacion: "NOW()",
    })
    .eq("id", id)
    .select();
  let { error: error2 } = await supabase()
    .from("asignaciones_charlas")
    .update({ precio })
    .eq("id_ponente", id)
    .eq("id_charla", charla_id)
    .select();
  if (error2)
    throw new Error(
      "Error al intentar actualizar la información del ponente. Intente de nuevo. Error: " +
        error.message
    );
  if (error)
    throw new Error(
      "Error al intentar actualizar la información del ponente. Intente de nuevo. Error: " +
        error.message
    );
  return true;
}

export async function getSpeakerByID(speaker_id: string): Promise<Speaker> {
  let { data, error } = await supabase().rpc("get_speakerByID", { speaker_id });
  if (error)
    throw new Error(
      "Error al intentar obtener los ponentes. Intente de nuevo. Error: " +
        error.message
    );
  return data as Speaker;
}

export async function getAssignmentsByTalkID(
  charla_id: string
): Promise<AsignacionesCharlasPonente[]> {
  let { data, error } = await supabase().rpc("get_asignaciones_charlabyid", {
    charla_id,
  });
  if (error)
    throw new Error(
      "Error al intentar obtener los ponentes. Intente de nuevo. Error: " +
        error.message
    );
  return data as AsignacionesCharlasPonente[];
}

export async function getSpeakersByTalkID(
  charla_id: string
): Promise<SpeakerAuxiliar[]> {
  return getAssignmentsByTalkID(charla_id)
    .then((AsignacionesCharlasPonente: AsignacionesCharlasPonente[]) => {
      let speakers: SpeakerAuxiliar[] = [];
      for (let i = 0; i < AsignacionesCharlasPonente.length; i++) {
        let team: SpeakerAuxiliar = {
          costo: AsignacionesCharlasPonente[i].precio,
          speaker: AsignacionesCharlasPonente[i].id_ponente as Speaker,
        };
        speakers.push(team);
      }
      return speakers;
    })
    .catch((error) => {
      throw new Error("Error al obtener los ponentes. Error: " + error.message);
    });
}

export async function getSpeakers() {
  let { data, error } = await supabase().rpc("get_speakers");
  if (error)
    throw new Error(
      "Error al intentar obtener los ponentes. Intente de nuevo. Error: " +
        error.message
    );
  return data as [];
}

export async function deleteSpeaker(speaker: Speaker): Promise<boolean> {
  const { id } = speaker;
  let { error } = await supabase()
    .from("ponentes")
    .delete()
    .eq("id", id)
    .select();
  if (error)
    throw new Error(
      "Error al intentar eliminar el ponente seleccionado. Intente de nuevo. Error: " +
        error.message
    );
  return true;
}

export async function addSpeakerToTalk(
  speaker: Speaker,
  id_charla: string,
  observacion: string,
  precio: number
) {
  const {
    nombre,
    apellido,
    correo,
    nro_identificacion,
    telefono,
    titulo,
    creado_por,
  } = speaker;
  let { data, error } = await supabase().rpc("agregar_ponente_a_charla", {
    apellido,
    correo,
    creado_por,
    id_charla,
    nombre,
    nro_identificacion,
    observacion,
    precio,
    telefono,
    titulo,
  });
  if (error)
    throw new Error(
      "Error al intentar asignar el miembro a la charla. Intente de nuevo. Error: " +
        error.message
    );
export async function addSpeakerToTalk(speaker: Speaker, id_charla:string, observacion: string, precio: number, id_evento: string){
  const {nombre, apellido, correo, nro_identificacion, telefono, titulo, creado_por} = speaker;
  let { data, error } = await supabase()
  .rpc('agregar_ponente_a_charla', {
    apellido, 
    correo, 
    creado_por, 
    id_charla, 
    nombre, 
    nro_identificacion, 
    observacion, 
    precio, 
    telefono, 
    titulo,
    id_evento
  })
  if (error) throw new Error('Error al intentar asignar el miembro a la charla. Intente de nuevo. Error: ' + error.message);
  return true;
}