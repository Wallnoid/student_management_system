BEGIN
  RETURN QUERY
  SELECT jsonb_build_object(
          'id', pagos_concursos.id,
          'monto', pagos_concursos.monto,
          'tipo', pagos_concursos.tipo,
          'id_participacion', jsonb_build_object(
            'id', participaciones.id,
            'id_equipo', participaciones.id_equipo,
            'id_concurso', participaciones.id_concurso,
            'fecha_hora_creacion', participaciones.fecha_hora_creacion
          ),
          'creado_por', jsonb_build_object(
            'nombre', creado_miembro.nombre,
            'apellido', creado_miembro.apellido,
            'categoria', creado_miembro.categoria
          ),
          'fecha_hora_creacion', pagos_concursos.fecha_hora_creacion,
          'actualizado_por', jsonb_build_object(
            'nombre', actualizado_miembro.nombre,
            'apellido', actualizado_miembro.apellido,
            'categoria', actualizado_miembro.categoria
          ),
          'fecha_hora_actualizacion', pagos_concursos.fecha_hora_actualizacion
         ) AS resultado_json
  FROM
    pagos_concursos
    LEFT JOIN participaciones ON pagos_concursos.id_participacion = participaciones.id
    LEFT JOIN miembros creado_miembro ON pagos_concursos.creado_por = creado_miembro.id
    LEFT JOIN miembros actualizado_miembro ON pagos_concursos.actualizado_por = actualizado_miembro.id;
END;