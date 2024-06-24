import { createClient as supabase } from "@/supabase/client";
import { Contest } from "@/interfaces/Contest";
import { Member } from "@/interfaces/Member";

export async function addContest(contest: Contest): Promise<boolean> {
  const {
    nombre,
    descripcion,
    responsable,
    id_evento,
    lugar,
    fecha_inicio,
    fecha_fin,
    hora_inicio,
    hora_fin,
    cantidad_participantes,
    cant_integrantes_por_equipo,
    creado_por,
  } = contest;
  let { error } = await supabase()
    .from("concurso")
    .insert({
      nombre,
      descripcion,
      responsable,
      cantidad_participantes,
      lugar,
      fecha_inicio,
      fecha_fin,
      hora_inicio,
      hora_fin,
      cant_integrantes_por_equipo,
      creado_por,
      id_evento,
      fecha_hora_creacion: "NOW()",
    })
    .select();
  if (error) {
    throw new Error(
      "Error al intentar agregar un concurso al evento seleccionado. Intente de nuevo. Error: " +
        error.message
    );
  }
  return true;
}

export async function updateContest(contest: Contest): Promise<boolean> {
  const {
    id,
    nombre,
    descripcion,
    responsable,
    lugar,
    fecha_inicio,
    fecha_fin,
    hora_inicio,
    hora_fin,
    cantidad_participantes,
    actualizado_por,
    estado,
  } = contest;
  let { error } = await supabase()
    .from("concurso")
    .update({
      nombre,
      descripcion,
      responsable,
      estado,
      lugar,
      fecha_inicio,
      fecha_fin,
      hora_inicio,
      hora_fin,
      cantidad_participantes,
      actualizado_por,
      fecha_hora_actualizacion: "NOW()",
    })
    .eq("id", id)
    .select();
  if (error) {
    throw new Error(
      "Error al intentar actualizar el concurso seleccionado. Intente de nuevo. Error: " +
        error.message
    );
  }
  return true;
}

export async function getAllContest() {
  let { data, error } = await supabase().rpc("get_contests");
  if (error)
    throw new Error(
      "Error al intentar recuperar todos los clubes disponibles. Rceargue la página e intente de nuevo. Error: " +
        error.message
    );
  return data as Contest[];
}

export async function getContestsByID(concurso_id: string) {
  let { data, error } = await supabase().rpc("get_contestbyid", {
    concurso_id,
  });
  if (error)
    throw new Error(
      "Error al intentar recuperar todos los clubes disponibles. Rceargue la página e intente de nuevo. Error: " +
        error.message
    );
  return data as Contest[];
}

export async function getContests(id_evento: string) {
  let { data, error } = await supabase().rpc("get_contestsByEventID", {
    evento_id: id_evento,
  });
  if (error)
    throw new Error(
      "Error al intentar recuperar todos los clubes disponibles. Rceargue la página e intente de nuevo. Error: " +
        error.message
    );
  return data as Contest[];
}

export async function deleteContest(contest: Contest, status: string) {
  console.log(contest.id);
  const actualizado_por = (contest.actualizado_por as Member).id;
  const { id } = contest;
  let { error } = await supabase()
    .from("concurso")
    .update({
      estado: status,
      actualizado_por,
      fecha_hora_actualizacion: "NOW()",
    })
    .eq("id", id)
    .select();
  if (error) {
    throw new Error(
      "Error al intentar eliminar el concurso seleccionado. Intente de nuevo. Error: " +
        error.message
    );
  }
  return true;
}
