import { ClubInternos } from "@/interfaces/ClubInternos";
import { projectSchema } from "@/schemas/project_schema";
import { useFormik } from "formik";
import { registerClub, updateClubs } from "../actions/crud_clubes";
import { es } from "date-fns/locale";

export default function FormikClubes(
  club: ClubInternos | null,
  currentUser: any
) {
  const formik = useFormik({
    initialValues: {
      nombre: club?.nombre || "",
      descripcion: club?.descripcion || "",
      presidente: club?.presidente || "",
      ubicacion: club?.ubicacion || "",
      estado: club?.estado || "activo",
    },
    validationSchema: projectSchema(),
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

      if (club) {
        clubLocal.id = club.id;

        updateClubs(clubLocal, formik);

        return;
      } else {
        clubLocal.actualizado_por = null;

        registerClub(clubLocal, formik);
      }
    },
  });

  return formik;
}
