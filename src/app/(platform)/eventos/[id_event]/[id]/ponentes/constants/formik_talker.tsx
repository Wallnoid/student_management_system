import { useFormik } from "formik";
import { Participant } from "@/interfaces/Participant";
import { registerTalker, updateTalkerCrud } from "../actions/talkerCrud";
import { talkerSchema } from "@/schemas/talkers_schema";
import { Speaker } from "@/interfaces/Speaker";

export default function FormikTalker(talker: Speaker | null, currentUser: any) {
  const formik = useFormik({
    initialValues: {
      cedula: talker?.nro_identificacion || "",
      nombre: talker?.nombre || "",
      apellido: talker?.apellido || "",
      telefono: talker?.telefono || "",
      correo: talker?.correo || "",
      titulo: talker?.titulo || "",
      estado: talker?.estado || "activo",
      id_talk: "",
      costo: 0 || 0,
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
    validationSchema: talkerSchema,
    onSubmit: (values) => {
      const talkerLocal: Speaker = {
        nombre: values.nombre,
        apellido: values.apellido,
        nro_identificacion: values.cedula,
        correo: values.correo,
        telefono: values.telefono,
        estado: values.estado,
        creado_por: currentUser!.user.id,
        actualizado_por: currentUser!.user.id,
        titulo: values.titulo,
      };

      console.log(talkerLocal);

      if (talker) {
        talkerLocal.id = talker.id;
        console.log(talkerLocal.id);

        updateTalkerCrud(talkerLocal, formik);

        return;
      } else {
        talkerLocal.actualizado_por = null;
        talkerLocal.estado = null;

        registerTalker(talkerLocal, values.id_talk, values.costo, formik);
      }
    },
  });

  return formik;
}
