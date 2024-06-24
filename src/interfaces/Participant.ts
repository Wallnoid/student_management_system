export interface Participant{
    id?: string;
    nombre: string;
    apellido: string;
    cedula: string;
    correo: string;
    fecha_nacimiento: string;
    telefono: string;
    estado?: string;
    creado_por?: string;
    fecha_hora_creacion?: string;
    actualizado_por?: string;
    fecha_hora_actualizacion?: string;
}