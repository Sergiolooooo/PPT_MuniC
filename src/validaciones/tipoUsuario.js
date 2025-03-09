class tipoDatos {
    static validateText(text,fieldName) {
        if (typeof text !== "string" || text.trim() === '') {
            return { valid: false, error: `El campo ${fieldName} debe ser un texto válido y no estar vacío` };
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

    static validateEstado(estado, fieldName) {
        if (typeof estado !== "string" || (estado !== '1' && estado !== '0')) {
            return { valid: false, error: `El ${fieldName} debe ser '1' (Activo) o '0' (Inactivo)` };
        }
        return { valid: true };
    }

    static validatePassword(password) {
        if (!password) {
            return { valid: false, error: 'La contraseña debe ser válida y no estar vacío ' };
        }
        if (password.length < 6) {
            return { valid: false, error: 'La contraseña debe tener al menos 6 caracteres' };
        }
        return { valid: true };
    }

    static validateId(id, fieldName) {
        if (!Number.isInteger(Number(id)) || id <= 0) {
            return { valid: false, error: `${fieldName} debe ser un número entero válido` };
        }
        return { valid: true };
    }

    static validateAll(data) {
        const { nombre_completo, email, password,estado } = data;

        let validationResult;

        validationResult = this.validateText(nombre_completo,"nombre_completo");
        if (!validationResult.valid) return validationResult;

        validationResult = this.validateEstado(estado,"estado");
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
