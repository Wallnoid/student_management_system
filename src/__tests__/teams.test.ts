import { AsignacionesEquipos } from "@/interfaces/AsignacionesEquipos";
import { Team } from "@/interfaces/Team";
import { addMemberToTeam, addTeam, captainAssignment, deleteTeam, getTeamInfoById, getTeams, updateTeam } from "@/services/teams.service";

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
            cant_integrantes: 6,
            creado_por: 'b60f644f-ab00-47cd-94ef-b55d22430c6c'
        }
        const result = await addTeam(team);
        expect(result).toBe(true);
    });
    

    test('Prueba de actualización de la información de un equipo.', async () => {
        const team: Team = {
            id: '31961a0a-0515-4403-a50e-9bd761cd50bd',
            nombre: 'TS Code Crew Updated',
            capitan: 'ce06fb77-0774-490f-a3fe-77bfced0ed70',
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
            id: '8e44cce7-f669-422a-a872-0e7c44c963e2',
            actualizado_por: 'b60f644f-ab00-47cd-94ef-b55d22430c6c'
        };
        const estado: string = 'eliminado';
        const result = await deleteTeam(team, estado);
        expect(result).toBe(true);
    });

    
    test('Prueba de asignación de un equipo a un miembro específico.', async () => {
        const asignacion: AsignacionesEquipos = {
            id_miembro: 'a8fdbdce-2777-40cd-817c-416a5d715fea',
            id_equipo: '31961a0a-0515-4403-a50e-9bd761cd50bd',
            observacion: 'comprobar identificación',
            creado_por: 'b60f644f-ab00-47cd-94ef-b55d22430c6c'
        };
        const result = await addMemberToTeam(asignacion);
        expect(result).toBe(true);
    });

    test('Prueba de recuperación de la informarción de un equipo, info e integrantes.', async () => {
        const id_team: string = '31961a0a-0515-4403-a50e-9bd761cd50bd';
        const result = await getTeamInfoById(id_team);
        expect(typeof result).toBe('object');
        // Verifica que la propiedad 'capitan' es un objeto
        expect(result).toHaveProperty('capitan');
        // Verifica que la propiedad 'participantes' es un objeto
        expect(result).toHaveProperty('participantes');
    });
    
    test('Prueba de asignar capitán a un participante, para un equipo. ', async () => {
        const id_team: string = '8ab0ed31-2dc1-44e8-90de-8e2a907d288a';
        const id_participant: string = 'ce06fb77-0774-490f-a3fe-77bfced0ed70';
        const result = await captainAssignment(id_team, id_participant);
        expect(result).toBe(true);
    });
});