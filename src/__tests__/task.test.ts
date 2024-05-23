import { AsignacionesTareas } from "@/interfaces/AsignacionesTareas";
import { Task } from "@/interfaces/Task";
import { actualizarResponsable, agregarResponsable, eliminarResponsable, getTaskById, insertTasksAndAssignments, updateTask, updateTaskStatus } from "@/services/task.service";

describe('Pruebas del servicio de tareas', () => {
    beforeAll(() => {
        expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined();
        expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('prueba de inserción de tareas y asignación de responsables', async () => {
        const tarea: Task = {
            nombre: 'Desarrollo módulo de productos',
            descripcion: 'implementación completa y funcional del módulo de productos',
            fecha_inicio: '2024-05-22',
            fecha_fin: '2024-05-31',
            id_proyecto: '614c76e2-54c7-4342-be87-602c65eea82b',
            responsables: 
            [
                '1d4deb3f-4d11-46f6-8c30-406a8c262ceb',
                '64da9cfe-0ab2-43ec-b6ad-597a7ff8cf7f'
            ],
            creado_por: '43948e9b-c4d1-473a-a952-c9d0dd1413a2',
        };
        const result = await insertTasksAndAssignments(tarea);
        expect(result).toBe(true);
    });

    test('prueba de recuperación de todas las tareas de un club específico.', async () => {
        const id_proyecto: string = '51b637a5-d428-46f4-a350-76888bc5754d';
        const result  = await getTaskById(id_proyecto);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    test('prueba de actualización del estado de una tarea', async () => {
        const id_proyecto: string = '51b637a5-d428-46f4-a350-76888bc5754d';
        const estado: string = 'completada';

        const result = await updateTaskStatus(id_proyecto, estado);
        expect(result).toBe(true);
    });

    test('prueba para actualizar la información de una tarea específica.', async () => {
        const tarea: Task = {
            id: '51b637a5-d428-46f4-a350-76888bc5754d',
            nombre: 'Desarrollo módulo de productos',
            descripcion: 'implementación completa y funcional del módulo de productos',
            fecha_inicio: '2024-05-22',
            fecha_fin: '2024-05-31',
            id_proyecto: '614c76e2-54c7-4342-be87-602c65eea82b',
            actualizado_por: 'b60f644f-ab00-47cd-94ef-b55d22430c6c'
        };
        const result = await updateTask(tarea);
        expect(result).toBe(true);
    });

    test('prueba de asignación de una tarea ya existente a un miembro del club', async () => {
        const asignacion_miembro: AsignacionesTareas = {
            id_tarea: '647b1c75-79b4-4737-9f14-20c4173f9230',
            id_miembro: '1d4deb3f-4d11-46f6-8c30-406a8c262ceb',
            comentario: 'tarea asignada despues de la creacion. prueba',
            creado_por: 'b60f644f-ab00-47cd-94ef-b55d22430c6c',
        };
        const result = await agregarResponsable(asignacion_miembro);
        expect(result).toBe(true);
    });

    test('prueba de actualización de la información de una asignación de tarea específica.', async () => {
        const asignacion_miembro: AsignacionesTareas = {
            id: 'e95dedf1-3a1f-44f3-aa52-94a50949432d',
            id_miembro: '64da9cfe-0ab2-43ec-b6ad-597a7ff8cf7f',
            comentario: 'tarea asignada despues de la creacion. prueba ACTUALIZACION',
            actualizado_por: 'b60f644f-ab00-47cd-94ef-b55d22430c6c',
        };
        const result = await actualizarResponsable(asignacion_miembro);
        expect(result).toBe(true);
    });

    test('prueba de eliminación de una asignación de tarea específica.', async () => {
        const id_asinacion: string = 'e79b9711-4140-409c-99f4-e7eed9c2245c';
        const result = await eliminarResponsable(id_asinacion);
        expect(result).toBe(true);
    });
});