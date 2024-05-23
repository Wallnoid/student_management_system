import * as yup from "yup";
import { parse, format } from "date-fns";

export const actualDate = new Date();

console.log(
  `${actualDate.getFullYear()}- ${actualDate.getMonth}-${
    actualDate.getDay
  } AQIO ESTOY `
);

export const projectSchema = () => {
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
    fechaInicio: yup
      .date()

      .max(
        new Date(`${actualDate.getFullYear() + 1}-01-01`),
        "La fecha de inicio debe ser menor a un año"
      ),
    fechaFinal: yup
      .date()
      .min(
        yup.ref("fechaInicio"),
        "La fecha de finalización debe ser mayor o igual a la fecha de inicio"
      )
      .max(
        new Date(`${actualDate.getFullYear() + 2}-01-01`),
        "La fecha de finalización debe ser menor a dos año"
      ),
  });
};
