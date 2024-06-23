import { Participant } from "./Participant";

export interface AsignacionesEquipos {
    id_asignacion?: string;
    id_miembro?: string | Participant;
    id_equipo?: string;
    observacion?: string;
    creado_por?: string;
    fecha_hora_creacion?: string;
    actualizado_por?: string;
    fecha_hora_actualizacion?: string;
}