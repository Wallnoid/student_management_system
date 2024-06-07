import { Member } from "@/interfaces/Member";
import { memberSchema } from "@/schemas/member_schema";
import { useFormik } from "formik";
import { registerMember, updateMember } from "../actions/crud_member";

export default function FormikMember(member: Member | null, currentUser: any) {
  const formik = useFormik({
    initialValues: {
      cedula: member?.nro_identificacion || "",
      nombre: member?.nombre || "",
      apellido: member?.apellido || "",
      telefono: member?.telefono || "",
      correo: member?.correo || "",
      carrera: member?.carrera || "",
      semestre: member?.semestre || "",
      fechaNacimiento: member?.fecha_nacimiento || "",
      rol: member?.categoria || "",
      estado: member?.estado || "",
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: memberSchema,
    onSubmit: (values) => {
      const memberLocal: Member = {
        nombre: values.nombre,
        apellido: values.apellido,
        fecha_nacimiento: values.fechaNacimiento,
        nro_identificacion: values.cedula,
        correo: values.correo,
        carrera: values.carrera,
        semestre: values.semestre,
        telefono: values.telefono,
        categoria: values.rol,
        estado: values.estado == "null" ? "activo" : values.estado,
        creado_por: currentUser!.user.id,
        actualizado_por: currentUser!.user.id,
      };

      console.log(memberLocal);

      if (member) {
        memberLocal.id = member.id;
        console.log(memberLocal.id);

        updateMember(memberLocal, formik);

        return;
      } else {
        memberLocal.actualizado_por = null;
        memberLocal.estado = null;

        console.log("Registrando miembro");
        registerMember(memberLocal, formik);
      }
    },
  });

  return formik;
}
