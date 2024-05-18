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
    //const {email, password, role, identification, lastName, firstName} = user;
    const {
        nombre, 
        apellido, 
        fecha_nacimiento, 
        nro_identificacion, 
        correo, 
        carrera, 
        semestre,
        estado,
        telefono,
        usuario,
        categoria,
        creado_por,
        fecha_hora_creacion,
    } = member
    const userauth = await supabase().auth.signUp({
        email: correo,
        password: nro_identificacion,
        options: {
            data: {
                role: categoria
            }
        }
    });
    //Reemplazar por un procedure para mejorar el retorno de error y campos especiales
    const userTable = await supabase().from('miembros').update({
        nombre: nombre,
        apellido: apellido,
        fecha_nacimiento: fecha_nacimiento,
        nro_identificacion: nro_identificacion,
        correo: correo,
        carrera: carrera,
        semestre: semestre,
        estado: estado,
        telefono: telefono,
        usuario: usuario,
        categoria: categoria,
        creado_por: creado_por,
        fecha_hora_creacion: fecha_hora_creacion
        }).eq('id', userauth.data.user?.id);
    if (userTable.error) {
        console.log("Error al insertar miembro.")
        return false;
    }
    return true;
}

export async function updateUser(member: Member) {
    const {
        nombre, 
        apellido, 
        correo, 
        carrera, 
        semestre,
        estado,
        telefono,
        usuario,
        categoria
    } = member
    const userauth = await supabase().auth.updateUser({
        email: correo,
        data: {
            role: categoria
        }
    });
    //Reemplazar por un procedure para mejorar el retorno de error y campos especiales
    const userTable = await supabase().from('miembros').update({
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        carrera: carrera,
        semestre: semestre,
        estado: estado,
        telefono: telefono,
        usuario: usuario,
        categoria: categoria
        }).eq('id', userauth.data.user?.id);
    if (userTable.error) {
        console.log("Error al actualizar miembro.")
        return false;
    }
    return true;
}

export async function updateRole(id: string, role: string) {
    const {data: user, error} = await supabase().auth.admin.updateUserById(
        id,
        {user_metadata: {role: role}}
    )
    if (error) {
        console.log("Error al actualizar el rol.")
        return false;
    }
    return true;
} 