import * as yup from "yup";
import { actualDate } from "./project_schema";

export const talksSchema = () => {
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
    fecha: yup
      .date()
        .required("La fecha es requerida")

      .max(
        new Date(`${actualDate.getFullYear() + 1}-01-01`),
        "La fecha de inicio debe ser menor a un año"
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
  });
};
