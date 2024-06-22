import { Member } from "./Member";

export interface Talk {
  id?: string;
  nombre?: string;
  descripcion?: string;
  id_evento?: string | Event;
  fecha?: string;
  lugar?: string;
  estado?: string;
  hora_inicio?: string;
  hora_fin?: string;
  creado_por?: string | Member;
  fecha_hora_creacion?: string;
  actualizado_por?: string;
  fecha_hora_actualizacion?: string;
  //PROPIEDADES DE LA ENTIDAD PARA ASIGNACIONES DE CHARLAS-PONENTES
  ponentes?: string[];
  precios?: number[];
  observaciones?: string[];
}
