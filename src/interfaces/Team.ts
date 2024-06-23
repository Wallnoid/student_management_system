import { Participant } from "./Participant";

export interface Team {
    id?: string;
    nombre?: string;
    cant_integrantes?: number;
    capitan?: Participant | string;
    estado?: string;
    creado_por?:Member |  string;
    fecha_hora_creacion?: string;
    actualizado_por?: Member | string;
    fecha_hora_actualizacion?: string;
}