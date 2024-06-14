import { Speaker } from "@/interfaces/Speaker";
import { addSpeaker, deleteSpeaker, getSpeakers, updateSpeaker } from "@/services/speakers.service";

describe('Pruebas del servicio de ponentes.', () => {
    beforeAll(() => {
        expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined();
        expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Prueba de inserción de un ponente.', async () => {
        const speaker: Speaker = {
            nombre: 'Marlon',
            apellido: 'Masabanda',
            nro_identificacion: '1801020304',
            correo: 'marlon@gmail.com',
            telefono: '0983201121',
            titulo: 'ing. Sistemas',
            creado_por: '859e7158-4191-48ac-82b4-d00fe142003a'
        };
        const result = await addSpeaker(speaker);
        expect(result).toBe(true);
    });

    test('Prueba de actualizacion de la información de un pontente.', async () => {
        const speaker: Speaker = {
            id: '6a4aa0c2-69aa-45e3-8319-79d916a2d607',
            nombre: 'Carla',
            apellido: 'Díaz',
            nro_identificacion: '0105720957',
            correo: 'tatidi2404@hotmail.com',
            telefono: '0995888484',
            titulo: 'ing. Sistemas',
            estado: 'activo',
            actualizado_por: '859e7158-4191-48ac-82b4-d00fe142003a'
        };
        const result = await updateSpeaker(speaker);
        expect(result).toBe(true);
    });

    test('Prueba de obtención de todos los ponentes registrados.', async () => {
        const result = await getSpeakers();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    test('Prueba de eliminación de un ponente en específico.', async () => {
        const speaker: Speaker = {
            id: '34810c69-2e28-47ec-89a6-20fc5692d1f1'
        };
        const result = await deleteSpeaker(speaker);
        expect(result).toBe(true);
    });

});