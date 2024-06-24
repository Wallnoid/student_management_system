import { Talk } from "@/interfaces/Talk";
import { addTalk, addTalkWithSpeakers, deleteTalk, getTalks, getTalksByEventId, updateTalk } from "@/services/talks.service";

describe('Pruebas del servicio de charlas', () => {
    beforeAll(() => {
        expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined();
        expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Prueba de inserción de una charla.', async () => {
        const talk: Talk = {
            nombre: 'TS/JS charla',
            descripcion: 'charla sobre la importacia de JS/TS en el desarrollo web.',
            id_evento: '7367bcd1-9737-41b3-bb21-15baeb1c89e3',
            lugar: 'Auditorio FISEI',
            fecha: '2024-07-10',
            hora_inicio: '16:00:00',
            hora_fin: '17:00:00',
            creado_por: '859e7158-4191-48ac-82b4-d00fe142003a',
        };
        const result = await addTalk(talk);
        expect(result).toBe(true);
    });

    test('Prueba de actualización de una charla específica.', async () => {
        const talk: Talk = {
            id: 'e2fd34ec-d08e-49e3-9652-052747381c3f',
            nombre: 'TS/JS charla updated II',
            descripcion: 'charla sobre la importacia de JS/TS en el desarrollo web.',
            id_evento: '7367bcd1-9737-41b3-bb21-15baeb1c89e3',
            lugar: 'Auditorio FISEI',
            fecha: '2024-07-10',
            estado: 'activo',
            hora_inicio: '16:00:00',
            hora_fin: '18:00:00',
            actualizado_por: '00b84c46-967e-4423-9084-cf17376dfb53',
        };
        const result = await updateTalk(talk);
        expect(result).toBe(true);
    });

    test('Prueba de obtención de todas las charlas registradas.', async () => {
        const result = await getTalks();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    test('Prueba de obtención las charlas de un evento en específico.', async () => {
        const evento_id: string = '7367bcd1-9737-41b3-bb21-15baeb1c89e3';
        const result = await getTalksByEventId(evento_id);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    test('Prueba de eliminación de una charla en específico.', async () => {
        const talk: Talk = {
            id: 'e2fd34ec-d08e-49e3-9652-052747381c3f',
            actualizado_por: '00b84c46-967e-4423-9084-cf17376dfb53',
        };
        const estado: string = 'eliminado';
        const result = await deleteTalk(talk, estado);
        expect(result).toBe(true);
    });


    test('Prueba de inserción de charlas y asignaciones de ponentes a dicha charla.', async () => {
        const talk: Talk = {
            nombre: 'JAVA charla',
            descripcion: 'charla sobre la importacia de JAVA.',
            id_evento: '7367bcd1-9737-41b3-bb21-15baeb1c89e3',
            lugar: 'Auditorio FISEI',
            fecha: '2024-07-11',
            hora_inicio: '16:00:00',
            hora_fin: '17:00:00',
            creado_por: '859e7158-4191-48ac-82b4-d00fe142003a',
            ponentes: ['b732fd8f-8f46-4387-a216-71a75b76e6e7', 'e8500fb1-aa8b-4eb5-9e1c-b7656d6edde1'],
            precios: [80, 20],
            observaciones: []
        };
        const result = await addTalkWithSpeakers(talk);
        expect(result).toBe(true);
    });
/*
    test('Prueba de asignaciones de ponentes a una charla ya existente', async () => {
        const ponentes: string[] = ['b732fd8f-8f46-4387-a216-71a75b76e6e7', 'e8500fb1-aa8b-4eb5-9e1c-b7656d6edde1'];
        const precios: number[] = [50, 50];
        const observaciones: string[] = [];
        const id_charla: string = 'e2fd34ec-d08e-49e3-9652-052747381c3f';
        const creado_por: string = '859e7158-4191-48ac-82b4-d00fe142003a';

        const result = await addSpeakersToTalk(ponentes, precios, creado_por, id_charla, observaciones);
        expect(result).toBe(true);
    });*/
});