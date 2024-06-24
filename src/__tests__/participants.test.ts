import { Participant } from "@/interfaces/Participant";
import { addParticipant, deleteParticipant, getParticipants, updateParticipant } from "@/services/participants.service";

describe('Pruebas de servicio de miembros.', () => {
    beforeAll(() => {
        expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined();
        expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
/*
    test('Prueba de registro de un participante.', async () => {
        const participant: Participant = {
            nombre: 'Mateo',
            apellido: 'Martinez',
            cedula: '0103050607',
            fecha_nacimiento: '2002-06-19',
            correo: 'mat@gmail.com',
            telefono: '0987654321',
            creado_por: '64e102c4-f132-406e-ad06-3f29827a95f5'
        };
        const result = await addParticipant(participant);
        expect(result).toBe(true);
    });
    */

    test('Prueba de actualización de un participante.', async () => {
        const participant: Participant = {
            id: '9a7be5d9-5511-497c-96cd-12ffc5740032',
            nombre: 'Martin',
            apellido: 'Martinez',
            cedula: '0105059463',
            fecha_nacimiento: '2002-06-19',
            correo: 'mati@gmail.com',
            telefono: '0987654321',
            actualizado_por: '64e102c4-f132-406e-ad06-3f29827a95f5'
        };
        const result = await updateParticipant(participant);
        expect(result).toBe(true);
    })
    
    /*
    test('Prueba de recuperación de todos los participantes registrados.', async () => {
        const result = await getParticipants();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    test('Prueba de eliminación (update) de un participante.', async () => {
        const id: string = 'ce06fb77-0774-490f-a3fe-77bfced0ed70';
        const estado: string = 'eliminado';
        const result = await deleteParticipant(estado, id);
        expect(result).toBe(true);
    });
    */

    
});