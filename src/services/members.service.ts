import { createClient as supabase } from "@/supabase/client";
import { Member } from "@/interfaces/Member";

let currentUser = null;

supabase().auth.onAuthStateChange((event, session) => {
  if (session) {
    currentUser = session;
  }
});

export async function getMembers() {
  let { data, error } = await supabase()
    .from("miembros")
    .select("*")
    .neq("estado", "eliminado");
  //.neq("id", currentUser!.user.id);
  if (error) {
      throw new Error('Error al recuperar datos del servidor. Intente más tarde.');
  }
  return data as Member[];
}

export async function getMemberById(id: string) {
  let {data, error} = await supabase().from("miembros").select("*").eq("id", id);
  if(error){
    throw new Error('Error al recuperar datos del miembro. Recargue la página e intente de nuevo.');
  }
  return data as Member[];
}

export async function getMemberStatus(id: string) {
  let {data, error} = await supabase().from("miembros").select("estado").eq("id", id);
  if(error){
    throw new Error('Error al recuperar el estado del miembro seleccionado. Intente de nuevo.');
  }
  return data as Member[];
}

export async function updateMemberStatus(id: string, estado: string) {
  let { error } = await supabase()
    .from("miembros")
    .update({ estado: estado })
    .eq("id", id);
  if (error) {
    throw new Error('Error al actualizar el miembro del estado. Recargue la página e intente de nuevo.');
  }
  return true;
}
