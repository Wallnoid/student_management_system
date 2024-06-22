import { ClubInternos } from "@/interfaces/ClubInternos";
import { useFormik } from "formik";
import { registerContest, updateContestCrud } from "../actions/crud_contets";
import { es } from "date-fns/locale";
import { clubSchema } from "@/schemas/clubes_schema";
import { Member } from "@/interfaces/Member";
import { Event } from "@/interfaces/Event";
import { Contest } from "@/interfaces/Contest";

export default function FormikContest(
  contest: Contest | null,
  currentUser: any,
  onClose: any
) {
  const formik = useFormik({
    initialValues: {
      nombre: contest?.nombre || "",
      descripcion: contest?.descripcion || "",
      responsable: (contest?.responsable as Member)?.id || "",
      ubicacion: contest?.descripcion || "",
      cant_participantes: contest?.cantidad_participantes || 0,
      estado: contest?.estado || "activo",
      fecha_inicio: "",
      fecha_fin: "",
      hora_inicio: "",
      hora_fin: "",
    },
    validationSchema: clubSchema(),
    onSubmit: (values) => {
      //AQUI HAY UN ERROR
      console.log(values);
      const contestLocal: Contest = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        responsable: values.responsable,
        cantidad_participantes: values.cant_participantes,
        creado_por: currentUser!.user.id,
        id_evento: contest?.id_evento || "",
        actualizado_por: currentUser!.user.id,
        estado: values.estado,
      };

      if (contest) {
        contestLocal.id = contest.id;

        updateContestCrud(contestLocal, formik);

        return;
      } else {
        contestLocal.actualizado_por = null;

        registerContest(contestLocal, formik, onClose);
      }
    },
  });

  return formik;
}
