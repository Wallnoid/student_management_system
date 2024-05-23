import { getMemberById, getMembers, getMemberStatus, updateMemberStatus } from "@/services/members.service";


describe('Pruebas de servicio de miembros.', () => {
    beforeAll(() => {
        expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined();
        expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('prueba de recuperación de todos los miembros del sistema.', async () => {
        const result = await getMembers();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    test('prueba de recuperacion de la información de un miembro en específico.', async () => {
        const id_miembro: string = 'd1ca1fbe-54c4-4992-9622-b3c44da3e5c3';
        const result = await getMemberById(id_miembro);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    test('prueba de recuperación del estado en el sistema de un miembro específico.', async () => {
        const id_miembro: string = 'd1ca1fbe-54c4-4992-9622-b3c44da3e5c3';
        const result = await getMemberStatus(id_miembro);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    test('prueba de actualización del estado de un miembro en específico.', async () =>{
        const id_miembro: string = 'd1ca1fbe-54c4-4992-9622-b3c44da3e5c3';
        const estado = 'eliminado';
        const result = await updateMemberStatus(id_miembro, estado);
        expect(result).toBe(true);
    });


});