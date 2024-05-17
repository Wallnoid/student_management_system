import {createClient as supabase} from "@/supabase/client";
import {Member} from "@/interfaces/Member";
export async function getMembers() {
    let usarios = await supabase()
        .from('miembros')
        .select('*')
    return usarios.data as Member[];
}