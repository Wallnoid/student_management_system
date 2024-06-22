import { Member } from "./Member";

export interface Contest {
  id?: string;
  nombre?: string;
  descripcion?: string;
  responsable?: string | Member;
  cantidad_participantes?: number;
  id_evento?: string;
  estado?: string;
  creado_por?: string | Member;
  fecha_hora_creacion?: string;
  actualizado_por?: string;
  fecha_hora_actualizacion?: string;
}
