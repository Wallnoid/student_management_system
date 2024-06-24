import { actualDate } from "@/constants/date_constants";
import * as yup from "yup";

export const eventsSchema = () => {
  return yup.object().shape({
    nombre: yup
      .string()
      .trim("No se permiten espacios al inicio o al final")
      .required("El nombre es requerido")
      .min(3, "debe contener al menos 3 caracteres")
      .max(20, "debe contener menos de 30 caracteres"),
    descripcion: yup
      .string()
      .required("La descripción es requerida")
      .min(3, "debe contener al menos 3 caracteres")
      .max(100, "debe contener menos de 100 caracteres"),
    responsable: yup
      .string()
      .notOneOf(["null"], "El responsable es requerido")
      .required("El responsable es requerido"),
    fecha_inicio: yup
      .date()

      .max(
        new Date(`${actualDate.getFullYear() + 1}-01-01`),
        "La fecha de inicio debe ser menor a un año"
      ),
    fecha_fin: yup
      .date()
      .min(
        yup.ref("fecha_inicio"),
        "La fecha de finalización debe ser mayor o igual a la fecha de inicio"
      )
      .max(
        new Date(`${actualDate.getFullYear() + 2}-01-01`),
        "La fecha de finalización debe ser menor a dos año"
      ),
  });
};
