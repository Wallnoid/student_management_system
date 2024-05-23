export interface Task {
    id?: string;
    comentario? : string,
    creado_por? : string,
    actualizado_por? : string,
    descripcion : string,
    fecha_fin : string,
    fecha_inicio : string,
    nombre : string,
    id_proyecto : string,
    responsables? : string[],
    estado? : string,
    fecha_hora_creacion? : string,
    fecha_hora_actualizacion? : string
}