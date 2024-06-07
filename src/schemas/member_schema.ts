import { actualDate } from "@/components/shared/table/constants/date_constants";
import * as yup from "yup";

const carreras = [
  "software",
  "telecomunicaciones",
  "ti",
  "ingenieriaIndustrial",
  "automatizacionYRobotica",
] as const;

const semestres = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as const;

const roles = [
  "lider",
  "colider",
  "secretario",
  "tesorero",
  "vocal",
  "normal",
] as const;

export type Carreras = (typeof carreras)[number];

export type Semestres = (typeof semestres)[number];

export type Roles = (typeof roles)[number];

// ESTE ES EL TIPO QUE ENVIAMOS A LOS SELECT PARA QUE ACEPTEN LOS DATOS
export type Data = { [key in Carreras | Semestres | Roles]: string };

export const mappeoCarreras: { [key in Carreras]: string } = {
  software: "Software",
  telecomunicaciones: "Telecomunicaciones",
  ti: "TI",
  ingenieriaIndustrial: "Ingenieria Industrial",
  automatizacionYRobotica: "Automatizacion y Robotica",
};

export const mappeoSemestres: { [key in Semestres]: string } = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
};

export const mappeoRoles: { [key in Roles]: string } = {
  lider: "Lider",
  colider: "Colider",
  secretario: "Secretario",
  tesorero: "Tesorero",
  vocal: "Vocal",
  normal: "Normal",
};

export const memberSchema = yup.object().shape({
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
  carrera: yup
    .string()
    .required("Carrera requerida")
    .oneOf(carreras, "debe ser una carrera válida"),
  semestre: yup
    .string()
    .required("Semestre requerido")
    .oneOf(semestres, "debe ser un semestre válido"),
  fechaNacimiento: yup
    .date()
    .min(new Date("1950-01-01"), "Muy Marlon")
    .max(new Date(`${actualDate.getFullYear() - 10}-01-01`), "Muy joven"),
  rol: yup
    .string()
    .required("Rol requerido")
    .oneOf(roles, "debe ser un rol válido"),
});
