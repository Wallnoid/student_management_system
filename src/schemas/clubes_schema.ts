import * as yup from "yup";

export const clubSchema = () => {
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
    president: yup
      .string(),

      // .notOneOf(["null"], "El responsable es requerido")
      // .required("El responsable es requerido"),

    //.required("El responsable es requerido"),
    ubicacion: yup
      .string()
      .trim("No se permiten espacios al inicio o al final")
      .required("La ubicacion es requerida")
      .min(3, "debe contener al menos 3 caracteres")
      .max(20, "debe contener menos de 30 caracteres"),
  });
};
