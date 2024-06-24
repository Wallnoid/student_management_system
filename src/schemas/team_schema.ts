import * as yup from "yup";

export const teamSchema = () => {
  return yup.object().shape({
    nombre: yup
      .string()
      .trim("No se permiten espacios al inicio o al final")
      .required("El nombre es requerido")
      .min(3, "debe contener al menos 3 caracteres")
      .max(20, "debe contener menos de 30 caracteres"),
    costo: yup
      .number()
      .required("El costo es requerido")
      .positive("El costo debe ser positivo")
      .min(0, "El costo debe ser mayor o igual a 0")
      .max(1000000, "El costo debe ser menor a 1000000"),
  });
};
