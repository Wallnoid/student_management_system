export interface Member {
  id?: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  nro_identificacion: string;
  correo: string;
  carrera: string;
  semestre: string;
  estado: string;
  telefono: string;
  usuario?: string;
  ultima_conexion?: string;
  categoria: string;
  creado_por: string;
  fecha_hora_creacion?: string;
  actualizado_por?: string;
  fecha_hora_actualizacion?: string;
}
