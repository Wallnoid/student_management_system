import { z } from "zod";

export const actualDate = new Date();

console.log(actualDate);


export const proyectSchema = z.object({
    nombre: z.string()
        .min(3, { message: "debe contener al menos 3 caracteres" })
        .max(30, { message: "debe contener menos de 30 caracteres" }),
    descripcion: z.string()
        .min(3, { message: "debe contener al menos 3 caracteres" })
        .max(100, { message: "debe contener menos de 100 caracteres" }),
    fechaInicio: z.date()
        .min(actualDate, { message: "La fecha de inicio debe ser mayor o igual a la actual" })
        .max(new Date(`${actualDate.getFullYear() + 1}-01-01`), { message: "La fecha de inicio debe ser menor a un año" }),
    fechaFinal: z.date()
        .min(actualDate, { message: "La fecha de finalización debe ser mayor o igual a la actual" })
        .max(new Date(`${actualDate.getFullYear() + 2}-01-01`), { message: "La fecha de finalización debe ser menor a dos año" })

})

