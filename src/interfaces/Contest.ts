import { Member } from "./Member";

export interface Contest {
  id?: string;
  nombre?: string;
  descripcion?: string;
  responsable?: string | Member;
  cantidad_participantes?: number;
  id_evento?: string;
  estado?: string;
  lugar?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  hora_inicio?: string;
  hora_fin?: string;
  cant_integrantes_por_equipo?: number;
  creado_por?: string;
  fecha_hora_creacion?: string;
  actualizado_por?: string;
  fecha_hora_actualizacion?: string;
}
