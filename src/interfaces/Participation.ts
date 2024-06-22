import { Contest } from "./Contest";
import { Team } from "./Team";

export interface Participation{
    id?: string;
    observacion?: string;
    id_concurso?: string | Contest;
    id_equipo?: string | Team;
    valor_participacion?: number;
    creado_por?: string;
    fecha_hora_creacion?: string;
    actualizado_por?: string;
    fecha_hora_actualizacion?: string;
}