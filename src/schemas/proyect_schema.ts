import * as yup from "yup";

export const actualDate = new Date();

console.log(
  `${actualDate.getFullYear()}- ${actualDate.getMonth}-${
    actualDate.getDay
  } AQIO ESTOY `
);

export const proyectSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("El nombre es requerido")
    .min(3, "debe contener al menos 3 caracteres")
    .max(30, "debe contener menos de 30 caracteres"),
  descripcion: yup
    .string()
    .required("La descripción es requerida")
    .min(3, "debe contener al menos 3 caracteres")
    .max(100, "debe contener menos de 100 caracteres"),
  fechaInicio: yup
    .date()
    .min(
      new Date(
        `${actualDate.getFullYear()}- ${
          actualDate.getMonth() + 1
        }-${actualDate.getDate()}`
      ),
      "La fecha de inicio debe ser mayor o igual a la actual"
    )
    .max(
      new Date(`${actualDate.getFullYear() + 1}-01-01`),
      "La fecha de inicio debe ser menor a un año"
    ),
  fechaFinal: yup
    .date()
    .min(
      actualDate,
      "La fecha de finalización debe ser mayor o igual a la actual"
    )
    .max(
      new Date(`${actualDate.getFullYear() + 2}-01-01`),
      "La fecha de finalización debe ser menor a dos año"
    ),
});
