import { ClubInternos } from "./ClubInternos";

export interface Proyecto{
    id?: string;
    nombre: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    estado: string;
    responsable: ClubInternos;
    creado_por: string;
    fecha_hora_creacion: string;
    actualizado_por?: string;
    fecha_hora_actualizacion?: string;
}