import { createClient as supabase } from "@/supabase/client";
import { Payments } from "@/interfaces/Payments";
let currentUser = null;

supabase().auth.onAuthStateChange((event, session) => {
    if (session) {
        currentUser = session;
    } else {
        currentUser = null;
    }
});

//Los tipos es concurso o evento

export async function getAllPayments(type: string) {
    let {error , data} = await supabase().rpc(`get_payments_${type}`);
    if (error) {
        throw new Error('Error al recuperar datos del servidor. Intente más tarde.');
    }
    return data as Payments[];
}

export async function getAllPaymentsVarious(type: string) {
    let { data, error } = await supabase()
        .from("pagos_"+type)
        .select("*")
    if (error) {
        throw new Error('Error al recuperar datos del servidor. Intente más tarde.');
    }
    return data as Payments[];
}

export async function getPaymentById(id: string, type: string) {
    let { data, error } = await supabase().from("pagos_"+type).select("*").eq("id", id);
    if (error) {
        throw new Error('Error al recuperar datos del pago. Recargue la página e intente de nuevo.');
    }
    return data as Payments[];
}

export async function addPyment(pago: Payments, type: string) {
    let { error } = await supabase()
        .from("pagos_"+type)
        .insert(pago);
    if (error) {
        throw new Error('Error al agregar el pago. Recargue la página e intente de nuevo.');
    }
    return true;
}

export async function updatePayment(id: string, pago: Payments, type: string) {
    let { error } = await supabase()
        .from("pagos_"+type)
        .update(pago)
        .eq("id", id);
    if (error) {
        throw new Error('Error al actualizar el pago. Recargue la página e intente de nuevo.');
    }
    return true;
}
//Este metodo retorna todos los pagos de concurso o evento o varios
export async function getAllDataPaymentByIdCE(id: string, type: string){
    let parametro = (type == "evento") ? "id_evento":"id_participacion";
    let {error , data} = await supabase().rpc(`get_payment_by_${type}_id`, {[parametro]: id});
    if (error) {
        throw new Error('Error al recuperar datos del servidor. Intente más tarde.');
    }
    return data as Payments[];
}