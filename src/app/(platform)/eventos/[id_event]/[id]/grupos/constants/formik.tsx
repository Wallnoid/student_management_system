import { useFormik } from "formik";
import { Team } from "@/interfaces/Team";
import { registerTeam, updateTeamCrud } from "../actions/teamCrud";
import { teamSchema } from "@/schemas/team_schema";
import { TeamAuxiliar } from "@/interfaces/TeamAuxiliar";

export default function FormikTeam(
  team: TeamAuxiliar | null,
  currentUser: any,
  onClose: any
) {
  const formik = useFormik({
    initialValues: {
      nombre: team?.team.nombre || "",
      cant_integrantes: team?.team.cant_integrantes || 1,
      estado: team?.team.estado || "activo",
      costo: team?.costo || 0,
      id_contest: "",
    },
    validationSchema: teamSchema(),
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
        
        teamLocal.id = team.team.id;
        updateTeamCrud(teamLocal, values.costo, values.id_contest, formik);
        return;
      } else {
        teamLocal.actualizado_por = null;
        registerTeam(
          teamLocal,
          values.id_contest,
          values.costo,
          formik,
          onClose
        );
      }
    },
  });

  return formik;
}
