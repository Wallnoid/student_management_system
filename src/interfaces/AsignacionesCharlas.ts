import { Member } from "./Member";
import { Talk } from "./Talk";
import { Ponente } from "./Ponente";

export interface AsignacionesCharlasPonente {
    id: string;
    id_ponente: string | Ponente;
    id_charla: string | Talk;
    precio: string;
    observacion: string;
    creado_por: string | Member;
    fecha_hora_creacion: string;
    actualizado_por?: string | Member;
    fecha_hora_actualizacion?: string;
  }
  