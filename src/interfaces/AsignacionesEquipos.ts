import { Member } from "./Member";
import { Participant } from "./Participant";
import { Team } from "./Team";

export interface AsignacionesEquipos {
    id_asignacion?: string;
    id_miembro?: string | Participant;
    id_equipo?: string | Team;
    participantes?: Participant[];
    observacion?: string;
    creado_por?: string | Member;
    fecha_hora_creacion?: string;
    actualizado_por?: string | Member;
    fecha_hora_actualizacion?: string;
}