import { Member } from "./Member";

export interface Speaker{
    id?: string;
    nombre?: string;
    apellido?: string;
    nro_identificacion?: string;
    correo?: string;
    telefono?: string;
    titulo?: string;
    estado?: string;
    creado_por?: string | Member;
    fecha_hora_creacion?: string;
    actualizado_por?: string | Member;
    fecha_hora_actualizacion?: string;
}