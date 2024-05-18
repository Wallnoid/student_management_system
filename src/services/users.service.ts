import {createClient as supabase} from "@/supabase/client";
import {UserRegister} from "@/interfaces/UserLogin";
import { Member } from "@/interfaces/Member";
//user logged in
let currentUser = null;

supabase().auth.onAuthStateChange((event, session) => {
    if (session) {
        currentUser = session;
    }
});

export async function registerUser(member: Member) {
    const userauth: any = await supabase().auth.signUp({
        email: member.correo,
        password: member.nro_identificacion,
        options: {
            data: {
                role: member.categoria
            }
        }
    });
    console.log(userauth);
    console.log(userauth.error);
    //Reemplazar por un procedure para mejorar el retorno de error y campos especiales
    const userTable = await supabase().from('miembros').update(member).eq('id', userauth.data.user.id);
    if (userTable.error) {
        console.log("Error al insertar miembro.")
        console.log(userTable.error);
        return false;
    }
    return true;
}

export async function updateUser(member: Member) {

    const userauth = await supabase().auth.updateUser({
        email: member.correo,
        data: {
            role: member.categoria
        }
    });

    const userTable = await supabase().from('miembros').update({
        nombre: member.nombre,
        apellido: member.apellido,
        correo: member.correo,
        carrera: member.carrera,
        semestre: member.semestre,
        estado: member.estado,
        telefono: member.telefono,
        categoria: member.categoria
        }).eq('id', userauth.data.user?.id);

    if (userTable.error) {
        console.log("Error al actualizar miembro.")
        return false;
    }
    return true;
}

export async function updateRole(member: Member, id: string) {
    const {data: user, error} = await supabase().auth.admin.updateUserById(
        id,
        {
            user_metadata: {role: member.categoria},
            email: member.correo
        }
    )
    const userTable = await supabase().from('miembros').update({
        nombre: member.nombre,
        apellido: member.apellido,
        correo: member.correo,
        carrera: member.carrera,
        semestre: member.semestre,
        estado: member.estado,
        telefono: member.telefono,
        categoria: member.categoria
        }).eq('id', id);
        
    if (userTable.error) {
        console.log("Error al actualizar miembro.")
        return false;
    }
    return true;
}

export { currentUser }