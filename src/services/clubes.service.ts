import { createClient as supabase } from "@/supabase/client";
import { ClubInternos } from "@/interfaces/ClubInternos";
import { Member } from "@/interfaces/Member";
import { AsignacionesClubes } from "@/interfaces/AsignacionesClubes";
import { GiConsoleController } from "react-icons/gi";

export async function insertClub(club: ClubInternos) {
  const { nombre, descripcion, ubicacion, presidente, creado_por } = club;
  let { error } = await supabase()
    .from("clubes_internos")
    .insert({
      nombre,
      descripcion,
      ubicacion,
      presidente,
      creado_por,
      fecha_hora_creacion: "NOW()",
    })
    .select();
  if (error) {
    console.log(error);
    throw new Error(
      "Ha ocurrido un error al insertar el club. Recargue la página e intente de nuevo"
    );
  }
  return true;
}
export async function updateClub(club: ClubInternos) {
  const {
    id,
    nombre,
    descripcion,
    ubicacion,
    presidente,
    estado,
    actualizado_por,
  } = club;
  const { error } = await supabase()
    .from("clubes_internos")
    .update({
      nombre,
      descripcion,
      ubicacion,
      presidente,
      estado,
      actualizado_por,
      fecha_hora_actualizacion: "NOW()",
    })
    .eq("id", id)
    .select();
  if (error) {
    throw new Error(
      "Ha ocurrido un error al actualizar la información del club. Recargue la página e intente de nuevo."
    );
  }
  return true;
}
//usar para eliminar tambien
export async function updateEstadoClub(id: string, estado: string) {
  const { error } = await supabase()
    .from("clubes_internos")
    .update({
      estado,
    })
    .eq("id", id)
    .select();
  if (error) {
    throw new Error(
      "Ha ocurrido un error al intentar eliminar el club, intente de nuevo."
    );
  }
  return true;
}
export async function getClubes() {
  let { data, error } = await supabase().rpc("getclubes");
  if (error) {
    throw new Error(
      "Error al recuperar los datos del servidor, intente más tarde. Error: " +
        error.message
    );
  }
  return data as [];
}
export async function getClub(ids: string[]) {
  let { data, error } = await supabase().rpc("club_con_datos", {
    ids_club: ids,
  });
  if (error) {
    throw new Error(
      "Error al obtener la información solicitada. Recargue la página e intente de nuevo"
    );
  }
  return data as ClubInternos[];
}
export async function addMemberToClub(miembro: AsignacionesClubes) {
  const {
    id_club_interno,
    id_miembro,
    comentario_asignacion,
    creado_por,
    categoria,
  } = miembro;
  const { error } = await supabase()
    .from("asignacion_miembros_clubes")
    .insert([
      {
        id_club_interno,
        id_miembro,
        comentario_asignacion,
        creado_por,
        fecha_hora_creacion: "NOW()",
        categoria,
      },
    ])
    .select();
  if (error) {
    console.log(error);
    throw new Error(
      "Error al intentar asignar un club al miembro. Intente más tarde."
    );
  }
  return true;
}
export async function updateMemberClub(miembro: AsignacionesClubes) {
  const {
    id,
    id_club_interno,
    id_miembro,
    comentario_asignacion,
    estado,
    actualizado_por,
    categoria,
  } = miembro;
  const { error } = await supabase()
    .from("asignacion_miembros_clubes")
    .update({
      id_club_interno,
      id_miembro,
      comentario_asignacion,
      estado,
      actualizado_por,
      fecha_hora_actualizacion: "NOW()",
      categoria,
    })
    .eq("id", id)
    .select();
  if (error) {
    throw new Error(
      "Error al actualizar la información del miembro del club. Intenter más tarde."
    );
  }
  return true;
}
export async function deleteMemberClub(id: string) {
  const { error } = await supabase()
    .from("asignacion_miembros_clubes")
    .delete()
    .eq("id", id)
    .select();
  if (error) {
    throw new Error(
      "Error al intentar eliminar el miembro del club. Intente de nuevo."
    );
  }
  return true;
}
export async function getMembersClub(id: string) {
  let { data, error } = await supabase().rpc("miembros_de_club", {
    id_club: id,
  });
  if (error) {
    throw new Error(
      "Error al recuperar los miembros del club. Intente más tarde."
    );
  }
  return data as Member[];
}
