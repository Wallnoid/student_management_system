class Validators {
    static isEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    }

    static isPassword(password: string): boolean {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    }

    static isName(name: string): boolean {
        const nameRegex = /^[a-zA-Z\s]{3,}$/;
        return nameRegex.test(name);
    }

    static isCedula(cedula: string) {
        const cedulaRegex = /^[0-9]{10}$/;
        return cedulaRegex.test(cedula);
    }

}

export { Validators }