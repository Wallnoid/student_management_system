import { createClient as supabase } from "@/supabase/client";

import { Member } from "@/interfaces/Member";
//user logged in
let currentUser = null;

supabase().auth.onAuthStateChange((event, session) => {
  if (session) {
    currentUser = session;
  } else {
    currentUser = null;
  }
});

export function getCurrentUser() {
  return currentUser;
}

export async function registerUser(member: Member) {
  const {
    nombre,
    apellido,
    fecha_nacimiento,
    nro_identificacion,
    correo,
    carrera,
    semestre,
    telefono,
    creado_por,
    categoria,
  } = member;
  if (!(await duplicateUser(member))) {
    throw new Error(
      "Usuario ya registrado en el sistema. Verificar cédula/correo e intente de nuevo."
    );
  }
  const userAuth = await supabase().auth.signUp({
    email: correo,
    password: nro_identificacion,
    options: {
      data: {
        role: categoria,
      },
    },
  });

  if (userAuth.error) {
    throw new Error(
      "Error al intentar registrar la información de autenticación. Intente más tarde"
    );
  }
  const userTable = await supabase()
    .from("miembros")
    .update({
      nombre,
      apellido,
      fecha_nacimiento,
      nro_identificacion,
      correo,
      carrera,
      semestre,
      telefono,
      creado_por,
      fecha_hora_creacion: "NOW()",
      categoria,
    })
    .eq("id", userAuth.data.user.id);
  if (userTable.error) {
    throw new Error(
      "Error al intentar registrar un usuario en el sistema. Intente de nuevo."
    );
  }
  return true;
}

export async function updateUser(member: Member) {
  const userauth = await supabase().auth.updateUser({
    email: member.correo,
  });

  if (userauth.error) {
    throw new Error(
      "Error al actualizar la información de autenticación del usuario. Intente de nuevo"
    );
  }

  const userTable = await supabase()
    .from("miembros")
    .update({
      nombre: member.nombre,
      apellido: member.apellido,
      correo: member.correo,
      carrera: member.carrera,
      semestre: member.semestre,
      estado: member.estado,
      telefono: member.telefono,
      categoria: member.categoria,
      actualizado_por: member.actualizado_por,
      fecha_hora_actualizacion: "NOW()",
    })
    .eq("id", member.id);
  if (userTable.error) {
    throw new Error(
      "Error al actualizar la información del miembro. Intente de nuevo."
    );
  }
  return true;
}

export async function updateRole(member: Member) {
  // const { error } = await supabase().auth.admin.updateUserById(member.id, {
  //   user_metadata: { role: member.categoria },
  //   email: member.correo,
  // });
  // if (error) {
  //   throw new Error("Error al actualizar información del administrador." + error);
  // }
  const userTable = await supabase()
    .from("miembros")
    .update({
      nombre: member.nombre,
      apellido: member.apellido,
      correo: member.correo,
      carrera: member.carrera,
      semestre: member.semestre,
      estado: member.estado,
      telefono: member.telefono,
      categoria: member.categoria,
      actualizado_por: member.actualizado_por,
      fecha_hora_actualizacion: "NOW()",
    })
    .eq("id", member.id);

  if (userTable.error) {
    throw new Error(
      "Error al actualizar la categoría del usuario seleccionado. Intente de nuevo."
    );
  }
  return true;
}

export async function duplicateUser(member: Member) {
  const { data, error } = await supabase()
    .from("miembros")
    .select("correo, nro_identificacion")
    .or(
      `correo.eq.${member.correo}, nro_identificacion.eq.${member.nro_identificacion}`
    );
  if (error) {
    throw new Error(
      "Información duplicada, revise las entradas e intente de nuevo."
    );
  }
  return data?.length <= 0;
}

export { currentUser };
