import { createClient as supabase } from "@/supabase/client";
import { Member } from "@/interfaces/Member";

let currentUser = null;

supabase().auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    // Solo actualiza currentUser cuando se inicia sesión
    currentUser = session;
  }
  console.log("User logged in: ", currentUser!);
});

export async function getMembers() {
  let { data, error } = await supabase()
    .from("miembros")
    .select("*")
    .neq("estado", "eliminado");
  //.neq("id", currentUser!.user.id);
  if (error) {
    console.error("Error fetching members:", error);
    return [];
  }
  return data as Member[];
}

export async function getMemberById(id: string) {
  let usarios = await supabase().from("miembros").select("*").eq("id", id);
  return usarios.data as Member[];
}

export async function getMemberStatus(id: string) {
  let usarios = await supabase().from("miembros").select("estado").eq("id", id);
  return usarios.data as Member[];
}

export async function updateMemberStatus(id: string, estado: string) {
  let { error } = await supabase()
    .from("miembros")
    .update({ estado: estado })
    .eq("id", id);
  if (error) {
    console.log("Error al actualizar estado.");
    return false;
  }
  return true;
}
