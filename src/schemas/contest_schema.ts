import { actualDate } from "@/constants/date_constants";
import * as yup from "yup";

export const contestsSchema = () => {
  return yup.object().shape({
    nombre: yup
      .string()
      .trim("No se permiten espacios al inicio o al final")
      .required("El nombre es requerido")
      .min(3, "debe contener al menos 3 caracteres")
      .max(50, "debe contener menos de 30 caracteres"),
    descripcion: yup
      .string()
      .required("La descripción es requerida")
      .min(3, "debe contener al menos 3 caracteres")
      .max(100, "debe contener menos de 100 caracteres"),
    responsable: yup
      .string()
      .notOneOf(["null"], "El responsable es requerido")
      .required("El responsable es requerido"),

    cant_participantes: yup
      .number()
      .required("La cantidad de participantes es requerida")
      .min(1, "La cantidad de participantes debe ser mayor a 0")
      .max(100, "La cantidad de participantes debe ser menor a 100"),

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
    hora_inicio: yup
      .string()
      .required("La hora de inicio es requerida")
      .matches(
        /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "La hora de inicio no es válida"
      ),
    hora_fin: yup
      .string()
      .required("La hora de finalización es requerida")
      .matches(
        /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "La hora de finalización no es válida"
      ),
    lugar: yup
      .string()
      .required("El lugar es requerido")
      .min(3, "debe contener al menos 3 caracteres")
      .max(100, "debe contener menos de 100 caracteres"),
    cant_integrantes_por_equipo: yup
      .number()
      .required("La cantidad de integrantes por equipo es requerida")
      .min(1, "La cantidad de integrantes por equipo debe ser mayor a 0")
      .max(10, "La cantidad de integrantes por equipo debe ser menor a 10"),
  });
};
