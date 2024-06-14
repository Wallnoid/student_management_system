import { AsignacionesClubes } from '@/interfaces/AsignacionesClubes';
import { ClubInternos } from '@/interfaces/ClubInternos';
import { addMemberToClub, getClub, getClubes, getMembersClub, insertClub, updateClub, updateEstadoClub, updateMemberClub } from '@/services/clubes.service';


describe('Pruebas de servicio de clubes', () => {
    beforeAll(() => {
        expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined();
        expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('prueba de inserción de club.', async () => {
        const club: ClubInternos = {
            nombre: 'Club de pruebas JEST',
            descripcion: 'descripcion del club de prueba',
            ubicacion: 'Ambato',
            presidente: '5d0a07b8-9bc3-48d7-b73e-4a666c8f05ff',
            creado_por: '21c655e9-2288-41de-a08c-4df3d13f3479',
            fecha_hora_creacion: 'NOW()',
        };
        const result = await insertClub(club);
        expect(result).toBe(true);
    });

    test('prueba de actualización de club.', async () => {
        const club: ClubInternos = {
            id: 'f8302374-87ef-43e1-97a0-a4a1a07c9250', 
            nombre: 'Club prueba actualizado', 
            descripcion: 'descripcion del club de prueba', 
            ubicacion: 'Ambato', 
            presidente: 'ca01c8eb-e54e-41b5-88e0-e6475967ebd2', 
            estado: 'activo', 
            actualizado_por: 'b60f644f-ab00-47cd-94ef-b55d22430c6c',
            fecha_hora_actualizacion: 'NOW()'
        };
        const result = await updateClub(club);
        expect(result).toBe(true);
    });

    test('prueba de cambio de estado de club (eliminar).', async () => {
        const id_club: string = 'f8302374-87ef-43e1-97a0-a4a1a07c9250';
        const estado_club: string = 'eliminado';
        const result = await updateEstadoClub(id_club, estado_club);
        expect(result).toBe(true);
    });

    test('prueba de obtención de clubes internos.', async () => {
        const result = await getClubes();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    test('prueba de obtención de club en específico.', async () => {
        const clubIds: string[] = ['cb2c22b1-2e65-4dd7-bb69-2fd21c3ff081'];
        const result = await getClub(clubIds);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    test('prueba de asignación de un miembro a un club interno.', async () => {
        const asignacion: AsignacionesClubes = {
            id_club_interno: 'cb2c22b1-2e65-4dd7-bb69-2fd21c3ff081',
            id_miembro: 'b60f644f-ab00-47cd-94ef-b55d22430c6c',
            categoria: 'miembro club interno',
            creado_por: '54acf6d9-8c8d-482f-8041-ae1cc7556c4d',
            fecha_hora_creacion: 'NOW()'
        };
        const result = await addMemberToClub(asignacion);
        expect(result).toBe(true);
    });

    test('prueba de actualización de asignación de miembro a club interno.', async () => {
        const asignacion: AsignacionesClubes = {
            id: '6390e452-2646-4f92-a4bf-c60e3cb1c7f8',
            id_club_interno: 'cb2c22b1-2e65-4dd7-bb69-2fd21c3ff081',
            id_miembro: 'b60f644f-ab00-47cd-94ef-b55d22430c6c',
            categoria: 'vocal club',
            estado: 'inactivo',
            comentario_asignacion: 'asignación comprobada',
            actualizado_por: '54acf6d9-8c8d-482f-8041-ae1cc7556c4d',
            fecha_hora_actualizacion: 'NOW()'
        };

        const result  = await updateMemberClub(asignacion);

        expect(result).toBe(true);
    });

    test('prueba de obtención de los miembros de un club en específico.', async () => {
        const id_club: string = 'cb2c22b1-2e65-4dd7-bb69-2fd21c3ff081';
        const result = await getMembersClub(id_club);

        expect(result).toHaveProperty('presidente');
        expect(result).toHaveProperty('miembros');

        const miembros = result.miembros;
        const presidente = result.presidente;

        expect(Array.isArray(miembros)).toBe(true);

        expect(typeof presidente).toBe('object');
        expect(presidente).not.toBeNull();

        expect(miembros.length).toBeGreaterThan(0);
    });
    
});