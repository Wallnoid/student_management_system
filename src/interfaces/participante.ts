import { Member } from "./Member";

export interface Participante {
    id: number;
    nombre: string;
    apellido: string;
    cedula: string;
    correo: string;
    fecha_nacimiento: Date;
    telefono: string;
    creado_por: string | Member;
    fecha_hora_creacion: Date;
    actualizado_por: string | Member;
    fecha_hora_actualizacion: Date;
    estado: string;
  }
  