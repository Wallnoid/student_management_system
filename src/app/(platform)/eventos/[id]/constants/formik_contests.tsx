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
      cant_participantes: contest?.cantidad_participantes || 1,
      estado: contest?.estado || "activo",
      fecha_inicio: contest?.fecha_inicio || "",
      fecha_fin: contest?.fecha_fin || "",
      hora_inicio: contest?.hora_inicio || "",
      hora_fin: contest?.hora_fin || "",
      lugar: contest?.lugar || "",
      cant_integrantes_por_equipo: contest?.cant_integrantes_por_equipo || 1,
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
        fecha_inicio: values.fecha_inicio,
        fecha_fin: values.fecha_fin,
        hora_inicio: values.hora_inicio,
        hora_fin: values.hora_fin,
        lugar: values.lugar,
        cant_integrantes_por_equipo: values.cant_integrantes_por_equipo,
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
