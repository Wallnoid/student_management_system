import { Member } from "./Member";

export interface Ponente {
    id?: string; // uuid
    nombre: string;
    apellido: string;
    nro_identificacion: string;
    correo: string;
    telefono: string;
    titulo: string;
    creado_por?: string | Member; // uuid
    fecha_hora_creacion?: string; // timestamp with timezone (ISO 8601 format)
    actualizado_por?: string | Member; // uuid, optional
    fecha_hora_actualizacion?: string; // timestamp with timezone (ISO 8601 format), optional
    estado: string;
  }
  