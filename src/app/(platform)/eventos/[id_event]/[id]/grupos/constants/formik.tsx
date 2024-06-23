import { useFormik } from "formik";
import { Member } from "@/interfaces/Member";
import { Event } from "@/interfaces/Event";
import { eventsSchema } from "@/schemas/events_schema";
import { Team } from "@/interfaces/Team";
import { registerTeam, updateTeamCrud } from "../actions/teamCrud";

export default function FormikTeam(
  team: Team | null,
  currentUser: any,
  onClose: any
) {
  const formik = useFormik({
    initialValues: {
      nombre: team?.nombre || "",
      cant_integrantes: team?.cant_integrantes || 1,
      estado: team?.estado || "activo",
    },
    validationSchema: eventsSchema(),
    onSubmit: (values) => {
      console.log(values);
      const teamLocal: Team = {
        nombre: values.nombre,
        cant_integrantes: values.cant_integrantes,
        creado_por: currentUser!.user.id,
        actualizado_por: currentUser!.user.id,
        estado: values.estado,
      };
      if (team) {
        teamLocal.id = team.id;
        updateTeamCrud(teamLocal, formik);
        return;
      } else {
        teamLocal.actualizado_por = null;
        registerTeam(teamLocal, formik, onClose);
      }
    },
  });

  return formik;
}
