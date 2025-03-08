class tipoDatos {

    static validateText(text) {
        if (typeof text !== "string" || text.trim() === '') {
            return { valid: false, error: 'El campo debe ser un texto válido y no estar vacío' };
        }
        return { valid: true };
    }

    static validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!regex.test(email)) {
            return { valid: false, error: 'El correo electrónico no tiene un formato válido' };
        }
        return { valid: true };
    }

    static validatePassword(password) {
        if (password.length < 6) {
            return { valid: false, error: 'La contraseña debe tener al menos 6 caracteres' };
        }
        return { valid: true };
    }

    static validateId(id, fieldName) {
        if (!Number.isInteger(id) || id <= 0) {
            return { valid: false, error: `${fieldName} debe ser un número entero válido` };
        }
        return { valid: true };
    }

    static validateAll(data) {
        const { nombre_completo, email, password,estado } = data;

        let validationResult;

        validationResult = this.validateText(nombre_completo);
        if (!validationResult.valid) return validationResult;

        validationResult = this.validateText(estado);
        if (!validationResult.valid) return validationResult;

        validationResult = this.validateEmail(email);
        if (!validationResult.valid) return validationResult;

        validationResult = this.validatePassword(password);
        if (!validationResult.valid) return validationResult;

        return { valid: true };
    }

    static validateLogin(data) {
        const { email, password } = data;

        let validationResult;

        validationResult = this.validateEmail(email);
        if (!validationResult.valid) return validationResult;

        validationResult = this.validatePassword(password);
        if (!validationResult.valid) return validationResult;

        return { valid: true };
    }

    static validateLogin(data) {
        const { email, password } = data;

        let validationResult;

        validationResult = this.validateEmail(email);
        if (!validationResult.valid) return validationResult;

        validationResult = this.validatePassword(password);
        if (!validationResult.valid) return validationResult;

        return { valid: true };
    }
}

module.exports = tipoDatos;
