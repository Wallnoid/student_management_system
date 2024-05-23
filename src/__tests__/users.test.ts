import { Member } from "@/interfaces/Member";
import { duplicateUser, registerUser, updateUser } from "@/services/users.service";


describe('Prueba del servicio de Users.', () => {
    beforeAll(() => {
        expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined();
        expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('prueba de inserción de un miembro, registrando información de autenticación y almacenamiento.', async () => {
        const member: Member = {
            nombre: 'Usuario',
            apellido: 'Prueba',
            fecha_nacimiento: '2000-01-01',
            nro_identificacion: '0456978123',
            carrera: 'software',
            categoria: 'normal',
            semestre: '6',
            correo: 'usuarioprueba@gmail.com',
            creado_por: 'ca01c8eb-e54e-41b5-88e0-e6475967ebd2',
            telefono: '0983201121'
        };
        const result  = await registerUser(member);
        expect(result).toBe(true);
    });

    test('prueba de actualización de la información de usuario específico.', async () => {
        const member: Member = {
            id: '99b93515-6e46-459f-be82-eff9f2a8d5f7',
            nombre: 'Usuario',
            apellido: 'Prueba Actualizado',
            fecha_nacimiento: '2000-01-01',
            nro_identificacion: '0456978123',
            carrera: 'software',
            categoria: 'normal',
            semestre: '6',
            correo: 'usuarioprueba@gmail.com',
            actualizado_por: 'ca01c8eb-e54e-41b5-88e0-e6475967ebd2',
            telefono: '0983201121'
        };
        const result  = await updateUser(member);
        expect(result).toBe(true);
    });

    test('prueba de verificación de que no exista información duplicada de registro.', async () => {
        const member: Member = {
            id: '99b93515-6e46-459f-be82-eff9f2a8d5f7',
            nombre: 'Usuario',
            apellido: 'Prueba Actualizado',
            fecha_nacimiento: '2000-01-01',
            nro_identificacion: '0456978129',
            carrera: 'software',
            categoria: 'normal',
            semestre: '6',
            correo: 'pruebas@gmail.com',
            actualizado_por: 'ca01c8eb-e54e-41b5-88e0-e6475967ebd2',
            telefono: '0983201121'
        };
        const result = await duplicateUser(member);

        expect(result).toBe(true);
    });
});