
import { Proyecto } from "@/interfaces/Proyecto";
import { actualizarEstadoProyecto, actualizarProyecto, getClubesAsignacionProyectos, getProyectos, ingresarProyecto } from "@/services/proyectos.service";

describe('Pruebas de servicio de proyectos.', () => {
    beforeAll(() => {
        expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined();
        expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('prueba de inserción de proyecto.', async () => {
        const proyecto: Proyecto = {
            nombre: 'Proyecto prueba jest',
            descripcion: 'prueba de insercion desde jest',
            fecha_inicio: '2024-05-21',
            fecha_fin: '2024-05-21',
            responsable: 'cb2c22b1-2e65-4dd7-bb69-2fd21c3ff081',
            creado_por: '54acf6d9-8c8d-482f-8041-ae1cc7556c4d',
            fecha_hora_creacion: 'NOW()'
        };
        const result = await ingresarProyecto(proyecto);
        expect(result).toBe(true);
    });

    test('prueba de recuperación de todos los proyectos', async () => {
        const result = await getProyectos();

        expect(Array.isArray(result)).toBe(true);
        expect(result.every(proyecto => typeof proyecto === 'object')).toBe(true);
    });

    test('prueba de actualización de proyecto.', async () => {
        const proyecto: Proyecto = {
            id: '79c848e0-6e49-4ece-938b-87196e39eac3',
            nombre: 'Proyecto prueba jest',
            descripcion: 'prueba de insercion desde jest',
            fecha_inicio: '2024-05-21',
            fecha_fin: '2024-05-21',
            responsable: 'cb2c22b1-2e65-4dd7-bb69-2fd21c3ff081',
            estado: 'completado', 
            actualizado_por: '54acf6d9-8c8d-482f-8041-ae1cc7556c4d',
            fecha_hora_actualizacion: 'NOW()'
        };
        const result = await actualizarProyecto(proyecto);
        expect(result).toBe(true);;
    });

    test('prueba de cambio de estado a "eliminado" de un proyecto. (eliminar proyecto)', async () => {
        const id_proyecto = '79c848e0-6e49-4ece-938b-87196e39eac3';
        const estado = 'eliminado';
        const result = await actualizarEstadoProyecto(id_proyecto, estado);
        expect(result).toBe(true);
    });

    test('prueba de recuperación de información de los clubes con los datos del respectivo presidente.', async () => {
        const result  = await getClubesAsignacionProyectos();
        expect(Array.isArray(result)).toBe(true);
    });

});