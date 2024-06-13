import { Member } from "./Member";
import { Event } from "./Event";
import { Participation } from "./Participation";

export interface Payments{
    id?: string,
    monto: number,
    id_evento?: Event | string,
    id_participacion?: Participation | string,
    creado_por?: Member | string,
    fecha_hora_creacion?: string,
    actualizado_por?: Member | string,
    fecha_hora_actualizacion?: string
}