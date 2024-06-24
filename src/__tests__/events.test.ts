import { Event } from "@/interfaces/Event";
import { addEvent, deleteEvent, getEventInfoById, getEvents, updateEvent } from "@/services/events.service";

describe('Pruebas del servicio de eventos', () => {
    beforeAll(() => {
        expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined();
        expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Prueba de inserción de un evento.', async () => {
        const event: Event = {
            nombre: 'Hatunsoft 2',
            descripcion: 'Segunda edicion del evento hatunsoft',
            fecha_inicio: '2024-07-10',
            fecha_fin: '2024-07-13',
            responsable: 'b60f644f-ab00-47cd-94ef-b55d22430c6c',
            creado_por: '64e102c4-f132-406e-ad06-3f29827a95f5'
        };
        const result = await addEvent(event);
        expect(result).toBe(true);
    });

    test('Prueba de actualización de un evento.', async () => {
        const event: Event = {
            id: '7367bcd1-9737-41b3-bb21-15baeb1c89e3',
            nombre: 'Hatunsoft 7',
            descripcion: 'Séptima edicion del evento hatunsoft',
            estado: 'activo',
            fecha_inicio: '2024-07-10',
            fecha_fin: '2024-07-13',
            responsable: 'b60f644f-ab00-47cd-94ef-b55d22430c6c',
            actualizado_por: '43948e9b-c4d1-473a-a952-c9d0dd1413a2'
        };
        const result = await updateEvent(event);
        expect(result).toBe(true);
    });

    test('Prueba de obtención de todos los eventos disponibles.', async () => {
        const result = await getEvents();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    test('Prueba de cambio de estado (eliminar) de un evento.', async () => {
        const event: Event = {
            id: '7367bcd1-9737-41b3-bb21-15baeb1c89e3',
            actualizado_por: '43948e9b-c4d1-473a-a952-c9d0dd1413a2'
        };
        const result = await deleteEvent(event, 'eliminado');
        expect(result).toBe(true);
    });

    test('Prueba de recuperación acerca de la información de un evento en específico.', async () => {
        const id: string = 'd24aef2b-8ba5-4456-ac0e-ce13b5426bfc';
        const result = await getEventInfoById(id);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });
})
