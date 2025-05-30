import { ClubInternos } from "@/interfaces/ClubInternos";
import { Proyecto } from "@/interfaces/Proyecto";
import { projectSchema } from "@/schemas/project_schema";
import { useFormik } from "formik";
import { registerProject, updateProject } from "../actions/crud_proyect";
import { currentDate } from "@/constants/date_constants";

export default function FormikProject(
  project: Proyecto | null,
  currentUser: any
) {
  const formik = useFormik({
    initialValues: {
      nombre: project?.nombre || "",
      descripcion: project?.descripcion || "",
      fechaInicio: project?.fecha_inicio || currentDate,
      fechaFinal: project?.fecha_fin || currentDate,
      responsable: (project?.responsable as ClubInternos)?.id || "",
      estado: project?.estado || "activo",
    },
    validationSchema: projectSchema(),
    onSubmit: (values) => {
      console.log(values);
      const projectLocal: Proyecto = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        fecha_inicio: values.fechaInicio,
        fecha_fin: values.fechaFinal,
        creado_por: currentUser!.user.id,
        actualizado_por: currentUser!.user.id,
        responsable: values.responsable,
        estado: values.estado,
      };

      if (project) {
        projectLocal.id = project.id;

        updateProject(projectLocal, formik);

        return;
      } else {
        projectLocal.actualizado_por = null;

        registerProject(projectLocal, formik);
      }
    },
  });

  return formik;
}
