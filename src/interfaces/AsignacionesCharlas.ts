import { Member } from "./Member";
import { Ponente } from "./Ponente";
import { Talk } from "./Talk";

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
  