import {createClient as supabase} from "@/supabase/client";
import {Member} from "@/interfaces/Member";


export async function getMembers() {
    let usarios = await supabase()
        .from('miembros')
        .select('*')
    return usarios.data as Member[];
}

export async function getMemberById(id: string) {
    let usarios = await supabase()
        .from('miembros')
        .select('*')
        .eq('id',id)
    return usarios.data as Member[];
}

export async function getMemberStatus(id: string) {
    let usarios = await supabase()
        .from('miembros')
        .select('estado')
        .eq('id',id)
    return usarios.data as Member[];
}