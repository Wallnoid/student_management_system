import { z } from "zod";


const carreras = ["software", "telecomunicaciones", "ti", "ingenieriaIndustrial", "automatizacionYRobotica"] as const

const semestres = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as const

const roles = ["lider", "colider", "secretario", "tesorero", "vocal", "normal"] as const

export const actualDate = new Date();


export type Carreras = (typeof carreras)[number]

export type Semestres = (typeof semestres)[number]

export type Roles = (typeof roles)[number]


// ESTE ES EL TIPO QUE ENVIAMOS A LOS SELECT PARA QUE ACEPTEN LOS DATOS 
export type Data = { [key in Carreras | Semestres | Roles]: string };



export const mappeoCarreras: { [key in Carreras]: string } = {
    software: "Software",
    telecomunicaciones: "Telecomunicaciones",
    ti: "TI",
    ingenieriaIndustrial: "Ingenieria Industrial",
    automatizacionYRobotica: "Automatizacion y Robotica"
}

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
    10: "10"
}

export const mappeoRoles: { [key in Roles]: string } = {
    lider: "Lider",
    colider: "Colider",
    secretario: "Secretario",
    tesorero: "Tesorero",
    vocal: "Vocal",
    normal: "Normal"
}


export const memberSchema = z.object({
    cedula: z.string()
        .min(10, { message: "debe contener 10 caracteres" })
        .max(10, { message: "debe contener 10 caracteres" })
        .refine((cedula: string) => !isNaN(parseInt(cedula)), {
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
    carrera: z.enum(carreras, { message: "debe ser una carrera válida" }),
    semestre: z.enum(semestres, { message: "debe ser un semestre válido" }),
    //fechaNacimiento: z.date({ message: "debe ser una fecha válida" }),
    fechaNacimiento: z.date()
        .min(new Date("1950-01-01"), { message: "Muy Marlon" })
        .max(new Date(`${(actualDate.getFullYear()) - 10}-01-01`), { message: "Muy joven" }),
    rol: z.enum(roles, { message: "debe ser un rol válido" })
});



