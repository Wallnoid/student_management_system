import { useFormik } from "formik";
import { Participant } from "@/interfaces/Participant";
import { registerTalker, updateTalkerCrud } from "../actions/talkerCrud";
import { talkerSchema } from "@/schemas/talkers_schema";
import { Speaker } from "@/interfaces/Speaker";
import { SpeakerAuxiliar } from "@/interfaces/SpeakerAuxiliar";

export default function FormikTalker(
  talker: SpeakerAuxiliar | null,
  currentUser: any
) {
  const formik = useFormik({
    initialValues: {
      cedula: talker?.speaker.nro_identificacion || "",
      nombre: talker?.speaker.nombre || "",
      apellido: talker?.speaker.apellido || "",
      telefono: talker?.speaker.telefono || "",
      correo: talker?.speaker.correo || "",
      titulo: talker?.speaker.titulo || "",
      estado: talker?.speaker.estado || "activo",
      id_talk: "",
      costo: talker?.costo || 0,
      id_event: "",
    },
    validateOnChange: true,
    validateOnBlur: true,
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
        talkerLocal.id = talker.speaker.id;
        console.log(talkerLocal.id);

        updateTalkerCrud(
          talkerLocal,
          values.id_talk,
          values.costo.toString(),
          formik
        );

        return;
      } else {
        talkerLocal.actualizado_por = null;
        talkerLocal.estado = null;

        registerTalker(
          talkerLocal,
          values.id_talk,

          Number(values.costo),

          formik,
          values.id_event
        );
      }
    },
  });

  return formik;
}
