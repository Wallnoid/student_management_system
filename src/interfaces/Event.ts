import { Member } from "./Member";

export interface Event {
    id?: string;
    nombre?: string;
    descripcion?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
    estado?: string;
    responsable?: string|Member;
    creado_por?: string|Member;
    fecha_hora_creacion?: string;
    actualizado_por?: string|Member;
    fecha_hora_actualizacion?: string;
}