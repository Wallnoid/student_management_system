import { AsignacionesEquipos } from "@/interfaces/AsignacionesEquipos";
import { Team } from "@/interfaces/Team";
import { addMemberToTeam, addTeam, deleteTeam, getTeams, updateTeam } from "@/services/teams.service";

describe('Pruebas del servicio de equipos', () => {
    beforeAll(() => {
        expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined();
        expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Prueba de inserción de un equipo.', async () =>{
        const team: Team = {
            nombre: 'TS Crew',
            capitan: '64e102c4-f132-406e-ad06-3f29827a95f5',
            cant_integrantes: 6,
            creado_por: 'b60f644f-ab00-47cd-94ef-b55d22430c6c'
        }
        const result = await addTeam(team);
        expect(result).toBe(true);
    });
/*
    test('Prueba de actualización de la información de un equipo.', async () => {
        const team: Team = {
            id: '9daf46f1-f833-4ff0-9bf0-ea8c13d36581',
            nombre: 'Code Crew Updated',
            capitan: '43948e9b-c4d1-473a-a952-c9d0dd1413a2',
            cant_integrantes: 3,
            estado: 'activo',
            actualizado_por: 'b60f644f-ab00-47cd-94ef-b55d22430c6c'
        };
        const result = await updateTeam(team);
        expect(result).toBe(true);
    });

    test('Prueba de obtención de todos los equipos participantes en los concursos.', async () => {
        const result = await getTeams();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    test('Prueba de eliminación de un equipo específico.', async () => {
        const team: Team = {
            id: '9daf46f1-f833-4ff0-9bf0-ea8c13d36581',
            actualizado_por: 'b60f644f-ab00-47cd-94ef-b55d22430c6c'
        };
        const estado: string = 'eliminado';
        const result = await deleteTeam(team, estado);
        expect(result).toBe(true);
    });


    test('Prueba de asignación de un equipo a un miembro específico.', async () => {
        const asignacion: AsignacionesEquipos = {
            id_miembro: '54acf6d9-8c8d-482f-8041-ae1cc7556c4d',
            id_equipo: '9daf46f1-f833-4ff0-9bf0-ea8c13d36581',
            observacion: '',
            creado_por: 'b60f644f-ab00-47cd-94ef-b55d22430c6c'
        };
        const result = await addMemberToTeam(asignacion);
        expect(result).toBe(true);
    });
*/
});