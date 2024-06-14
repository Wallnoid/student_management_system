export interface Task {
    id?: string,

    comentario? : string,
    creado_por? : string,
    actualizado_por? : string,
    creado_por_tarea? : string,
    descripcion : string,
    fecha_fin : string,
    fecha_inicio : string,
    nombre : string,
    id_proyecto : string,
    responsables? : string[]
    estado? : string,
}