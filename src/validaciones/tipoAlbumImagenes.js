class tipoDatos {

    static validateId(id, fieldName) {
        if (!Number.isInteger(Number(id)) || id <= 0) {
            return { valid: false, error: `${fieldName} debe ser un número entero válido` };
        }
        return { valid: true };
    }

    static validateText(text, fieldName) {
        if (typeof text !== "string" || text.trim() === '') {
            return { valid: false, error: `${fieldName} debe ser un texto válido y no estar vacío` };
        }
        return { valid: true };
    }

    static validateOneImage(file, fieldName) {
        if (!file || file.length <= 0 || file.length > 1) {
            return { valid: false, error: `${fieldName} debe contener una sola imagen` };
        }
        return { valid: true };
    }

    static validateOneOMoreImages(file, fieldName) {
        if (!file || file.length <= 0 || file.length > 8) {
            return { valid: false, error: `${fieldName} debe contener de 1 hasta 8 imagenes` };
        }
        return { valid: true };
    }
}

module.exports = tipoDatos;
