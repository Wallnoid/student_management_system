import { ClubInternos } from "@/interfaces/ClubInternos";
import { useFormik } from "formik";
import { registerTalk, updateTalkCrud } from "../actions/crud_talks";
import { es } from "date-fns/locale";
import { clubSchema } from "@/schemas/clubes_schema";
import { Member } from "@/interfaces/Member";
import { Event } from "@/interfaces/Event";
import { Talk } from "@/interfaces/Talk";
import { talksSchema } from "@/schemas/talksSchema";

export default function FormikTalks(
  talk: Talk | null,
  currentUser: any,
  onClose: any
) {
  const formik = useFormik({
    initialValues: {
      nombre: talk?.nombre || "",
      descripcion: talk?.descripcion || "",
      lugar: talk?.lugar || "",
      fecha: talk?.fecha || "",
      hora_inicio: talk?.hora_inicio || "",
      hora_fin: talk?.hora_fin || "",
      estado: talk?.estado || "activo",
      id_evento: talk?.id_evento || "",
    },
    validationSchema: talksSchema(),
    onSubmit: (values) => {
      console.log(values);
      const talksLocal: Talk = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        creado_por: currentUser!.user.id,
        fecha: values.fecha,
        hora_inicio: values.hora_inicio,
        hora_fin: values.hora_fin,
        lugar: values.lugar,
        id_evento: values.id_evento,
        actualizado_por: currentUser!.user.id,
        estado: values.estado,
      };

      if (talk) {
        talksLocal.id = talk.id;

        updateTalkCrud(talksLocal, formik);

        return;
      } else {
        talksLocal.actualizado_por = null;

        registerTalk(talksLocal, formik, onClose);
      }
    },
  });

  return formik;
}
