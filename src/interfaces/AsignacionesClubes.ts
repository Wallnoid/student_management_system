import { Member } from "./Member";

export interface AsignacionesClubes {
  id?: string;
  id_club_interno: string;
  id_miembro: string;
  comentario_asignacion?: string;
  estado?: string;
  creado_por?: string;
  fecha_hora_creacion?: string;
  actualizado_por?: string | Member;
  fecha_hora_actualizacion?: string;
}
