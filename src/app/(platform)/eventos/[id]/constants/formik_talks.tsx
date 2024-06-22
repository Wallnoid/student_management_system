import { ClubInternos } from "@/interfaces/ClubInternos";
import { useFormik } from "formik";
import { registerTalk, updateTalkCrud } from "../actions/crud_talks";
import { es } from "date-fns/locale";
import { clubSchema } from "@/schemas/clubes_schema";
import { Member } from "@/interfaces/Member";
import { Event } from "@/interfaces/Event";
import { Talk } from "@/interfaces/Talk";

export default function FormikTalks(
  talk: Talk | null,
  currentUser: any,
  onClose: any
) {
  const formik = useFormik({
    initialValues: {
      nombre: talk?.nombre || "",
      descripcion: talk?.descripcion || "",
      presidente: talk?.lugar || "",
      ubicacion: talk?.lugar || "",
      estado: talk?.estado || "activo",
    },
    validationSchema: clubSchema(),
    onSubmit: (values) => {
      //AQUI HAY UN ERROR
      console.log(values);
      const clubLocal: ClubInternos = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        presidente: values.presidente,
        creado_por: currentUser!.user.id,
        ubicacion: values.ubicacion,
        actualizado_por: currentUser!.user.id,
        estado: values.estado,
      };

      if (talk) {
        clubLocal.id = talk.id;

        updateTalkCrud(clubLocal, formik);

        return;
      } else {
        clubLocal.actualizado_por = null;

        registerTalk(clubLocal, formik, onClose);
      }
    },
  });

  return formik;
}
