
import { z } from "zod";


export const carreras = [
    { label: "Software", key: "software", value: "software" },
    { label: "Industrial", key: "industrial", value: "industrial" },
    { label: "Telecomunicaciones", key: "telecomunicaciones", value: "telecomunicaciones" },
    { label: "no_se_mas", key: "no_se_mas", value: "no_se_mas" },
];


export const memberSchema = z.object({
    cedula: z.string()
        .min(10, { message: "debe contener 10 caracteres" })
        .max(10, { message: "debe contener 10 caracteres" })
        .refine((cedula) => !isNaN(parseInt(cedula)), {
            message: "Solo puede contener números"
        })
    ,
    nombre: z.string()
        .min(3, { message: "debe contener al menos 3 caracteres" })
        .max(30, { message: "debe contener menos de 30 caracteres" })
        .refine((nombre) => nombre.match(/^[a-zA-Z\s]*$/), {
            message: "Solo puede contener letras"
        })

    ,
    apellido: z.string()
        .min(3, { message: "debe contener al menos 3 caracteres" })
        .max(30, { message: "debe contener menos de 30 caracteres" })
        .refine((nombre) => nombre.match(/^[a-zA-Z\s]*$/), {
            message: "Solo puede contener letras"
        }),
    telefono: z.string()
        .min(10, { message: "debe contener 10 caracteres" })
        .max(10, { message: "debe contener 10 caracteres" })
        .refine((cedula) => !isNaN(parseInt(cedula)), {
            message: "Solo puede contener números"
        }),

    correo: z.string().email({ message: "debe ser un correo válido" }),
    carrera: z.string(),
    semestre: z.string(),
    fecha_nacimiento: z.string(),
    rol: z.string(),
});


