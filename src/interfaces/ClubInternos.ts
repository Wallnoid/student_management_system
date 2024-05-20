import { Member } from "./Member";

export interface ClubInternos {
    id?: string;
    nombre: string;
    descripcion: string;
    ubicacion: string;
    presidente: Member;
    estado?: string;
    creador_por: string;
    fecha_hora_creacion?: string;
    actualizado_por?: string;
    fecha_hora_actualizacion?: string;
}