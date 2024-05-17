import {createClient as supabase} from "@/supabase/client";
import {UserRegister} from "@/interfaces/UserLogin";
//user logged in
let currentUser = null;

supabase().auth.onAuthStateChange((event, session) => {
    if (session) {
        currentUser = session;
    }
});

export async function registerUser(user: UserRegister) {
    const {email, password, role, identification, lastName, firstName} = user;
    const userauth = await supabase().auth.signUp({
        email,
        password,
        options: {
            data: {
                role
            }
        }
    });
    //Reemplazar por un procedure para mejorar el retorno de error y campos especiales
    const userTable = await supabase().from('users').update({
        identification: identification,
        status: true,
        lastName: lastName,
        firstName: firstName
    }).eq('id', userauth.data.user?.id);
    if (userTable.error) {
        console.log("Error al insertar en la tabla users")
        return false;
    }
    return true;
}

export async function updateUser(user: UserRegister) {
    const {email, password, role, identification, lastName, firstName} = user;
    const userauth = await supabase().auth.updateUser({
        email,
        password,
        data: {
            role
        }
    });
    //Reemplazar por un procedure para mejorar el retorno de error y campos especiales
    const userTable = await supabase().from('users').update({
        identification: identification,
        lastName: lastName,
        firstName: firstName,
        updated_at: 'now()'
    }).eq('id', userauth.data.user?.id);
    if (userTable.error) {
        console.log("Error al actualizar en la tabla users")
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
        console.log("Error al actualizar el rol")
        return false;
    }
    return true;
}