import { Participant } from "@/interfaces/Participant";
import { createClient as supabase } from "@/supabase/client";

export async function addParticipant(
  participant: Participant,
  id_team: string
): Promise<Boolean> {
  const {
    nombre,
    apellido,
    cedula,
    correo,
    fecha_nacimiento,
    telefono,
    creado_por,
  } = participant;
  let { error, data } = await supabase()
    .from("participantes")
    .insert({
      nombre,
      apellido,
      cedula,
      correo,
      fecha_nacimiento,
      telefono,
      creado_por,
      fecha_hora_creacion: "NOW()",
    })
    .select("id");
  let id_miembro = data[0].id;
  let { error: error2 } = await supabase()
    .from("asignaciones_miembros_equipos")
    .insert({
      id_miembro,
      id_equipo: id_team,
      observacion: "Participante asignado al equipo",
      creado_por,
      fecha_hora_creacion: "NOW()",
    })
    .select();

  if (error2)
    throw new Error(
      "Error al intentar asignar un participante al equipo " + error.message
    );

  if (error)
    throw new Error(
      "Error al intentar registrar el participante. Intente de nuevo. Error: " +
        error.message
    );
  return true;
}

export async function updateParticipant(
  participant: Participant
): Promise<boolean> {
  const { id, nombre, apellido, telefono, actualizado_por } = participant;
  let { error } = await supabase()
    .from("participantes")
    .update({
      nombre,
      apellido,
      telefono,
      actualizado_por,
      fecha_hora_actualizacion: "NOW()",
    })
    .eq("id", id)
    .select();
  if (error)
    throw new Error(
      "Error al intentar actualizar el participante seleccionado. Intente de nuevo. Error: " +
        error.message
    );
  return true;
}

export async function getParticipants() {
  let { data, error } = await supabase()
    .from("participantes")
    .select("*")
    .neq("estado", "eliminado");
  if (error) {
    throw new Error(
      "Error al intentar recuperar los participantes. Intente más tarde. Error: " +
        error.message
    );
  }
  return data as Participant[];
}

export async function deleteParticipant(
  estado: string,
  id: string
): Promise<Boolean> {
  let { error } = await supabase()
    .from("participantes")
    .update({ estado: estado })
    .eq("id", id);
  if (error) {
    throw new Error(
      "Error al eliminar el participante. Recargue la página e intente de nuevo. Error: " +
        error.message
    );
  }
  return true;
}
