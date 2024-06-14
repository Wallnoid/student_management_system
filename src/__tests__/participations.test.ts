import { Participation } from "@/interfaces/Participation";
import { addParticipation, getParticipations, getTeamsParticipations, getTeamsParticipationsByContest } from "@/services/participations.service";


describe('Pruebas del servicio de participaciones', () => {
    beforeAll(() => {
        expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined();
        expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Prueba de inserción de una participación de un equipo en un concurso', async () => {
        const participation: Participation = {
            id_concurso: 'ed7ea07a-1431-4324-98f0-369dbc33ebc2',
            id_equipo: 'd5ec2828-e384-4a4a-ac80-12ced739dc5e',
            observacion: '',
            valor_participacion: 30,
            creado_por: 'b60f644f-ab00-47cd-94ef-b55d22430c6c'
        };
        const result = await addParticipation(participation);
        expect(result).toBe(true);
    });

    test('Prueba de obtención de todas las participaciones, de todos los equipos en todos los concursos.', async () => {
        const result = await getParticipations();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    test('Prueba de obtención de todas las participaciones de un equipo en específico.', async () => {
        const id_equipo: string = '9daf46f1-f833-4ff0-9bf0-ea8c13d36581';
        const result = await getTeamsParticipations(id_equipo);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });

    test('Prueba de obtención de todos los equipos que participaron en un concurso.', async () => {
        const id_concurso: string = 'ed7ea07a-1431-4324-98f0-369dbc33ebc2';
        const result = await getTeamsParticipationsByContest(id_concurso);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });
});