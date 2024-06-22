import { Contest } from "@/interfaces/Contest";
import { addContest, deleteContest, getContests, updateContest } from "@/services/contests.service";

describe('Pruebas del servicio de concursos', () => {
    beforeAll(() => {
        expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined();
        expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Prueba de registro de un concurso en un evento ya existente.', async () => {
        const contest: Contest = {
            nombre: 'Concurso de COD WARZONE',
            descripcion: 'Concurso de cod warzone perteneciente al Hatunsof 2',
            responsable: 'b60f644f-ab00-47cd-94ef-b55d22430c6c',
            cantidad_participantes: 20,
            lugar: 'Auditorio FISEI', 
            fecha_inicio: '2024-07-01', 
            fecha_fin: '2024-07-10', 
            hora_inicio: '09:00:00', 
            hora_fin: '13:00:00',
            cant_integrantes_por_equipo: 3, 
            id_evento: '2bb1c1bd-72cc-441c-afaa-76065383ee26',
            creado_por: '64e102c4-f132-406e-ad06-3f29827a95f5'
        }
        const result = await addContest(contest);
        expect(result).toBe(true);
    });

    test('Prueba de recuperación de todos los concursos relacionados a un evento. ', async () => {
        const id_evento: string = '2bb1c1bd-72cc-441c-afaa-76065383ee26';
        const result = await getContests(id_evento);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    test('Prueba de actualización de la información de un concurso en específico.', async () => {
        const contest: Contest = {
            id: '4b47c2b6-fcfc-4671-aac9-c842919dab49',
            nombre: 'Concurso de programacion II',
            descripcion: 'Concurso de algoritmia perteneciente al Hatunsof 2. Actualizado',
            responsable: 'b60f644f-ab00-47cd-94ef-b55d22430c6c',
            cantidad_participantes: 40,
            lugar: 'Auditorio FISEI', 
            fecha_inicio: '2024-07-01', 
            fecha_fin: '2024-07-10', 
            hora_inicio: '09:00:00', 
            hora_fin: '13:00:00',
            cant_integrantes_por_equipo: 3, 
            estado: 'activo', 
            id_evento: '2bb1c1bd-72cc-441c-afaa-76065383ee26',
            actualizado_por: '43948e9b-c4d1-473a-a952-c9d0dd1413a2'
        }
        const result = await updateContest(contest);
        expect(result).toBe(true);
    });

    test('Prueba de cambio de estado (eliminar) de un concurso seleccionado.', async () => {
        const contest: Contest = {
            id: 'ed7ea07a-1431-4324-98f0-369dbc33ebc2',
            actualizado_por: '43948e9b-c4d1-473a-a952-c9d0dd1413a2'
        };
        const result = await deleteContest(contest, 'eliminado');
        expect(result).toBe(true);
    });

})