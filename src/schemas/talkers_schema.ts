import { actualDate } from "@/constants/date_constants";
import * as yup from "yup";

export const talkerSchema = yup.object().shape({
  cedula: yup
    .string()
    .trim("No se permiten espacios al inicio o al final")
    .required("La cedula es requerida")
    .matches(/^[0-9]+$/, "Solo puede contener números")
    .min(10, "debe contener 10 caracteres")
    .max(10, "debe contener 10 caracteres"),
  nombre: yup
    .string()
    .trim("No se permiten espacios al inicio o al final")
    .required("El nombre es requerido")
    .matches(/^[a-zA-Z]*$/, "Solo puede contener letras")
    .min(3, "debe contener al menos 3 caracteres")
    .max(30, "debe contener menos de 30 caracteres"),
  apellido: yup
    .string()
    .trim("No se permiten espacios al inicio o al final")
    .required("El apellido es requerido")
    .matches(/^[a-zA-Z]*$/, "Solo puede contener letras")
    .min(3, "debe contener al menos 3 caracteres")
    .max(30, "debe contener menos de 30 caracteres"),
  telefono: yup
    .string()
    .trim("No se permiten espacios al inicio o al final")
    .required("El telefono es requerido")
    .matches(/^[0-9]+$/, "Solo puede contener números")
    .min(10, "debe contener 10 caracteres")
    .max(10, "debe contener 10 caracteres"),
  correo: yup
    .string()
    .trim("No se permiten espacios al inicio o al final")
    .email("debe ser un correo válido")
    .required("El correo es requerido"),
  titulo: yup
    .string()
    .trim("No se permiten espacios al inicio o al final")
    .required("El titulo es requerido")
    .matches(/^[a-zA-Z]*$/, "Solo puede contener letras")
    .min(3, "debe contener al menos 3 caracteres")
    .max(30, "debe contener menos de 30 caracteres"),
});
