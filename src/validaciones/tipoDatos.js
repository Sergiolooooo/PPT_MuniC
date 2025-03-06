class tipoDatos {

    static validateText(text) {
        if (typeof text !== "string" || text.trim() === '') {
            return { valid: false, error: 'El campo debe ser un texto válido y no estar vacío' };
        }
        return { valid: true };
    }

    static validateFloat(value, fieldName) {
        if (value === undefined || value === null || value === '' || isNaN(parseFloat(value))) {
            return { valid: false, error: `${fieldName} debe ser un número válido` };
        }
        return { valid: true };
    }

    static validatePhone(phone) {
        const regex = /^[0-9]{8}$/; // Asegura que sean 8 dígitos numéricos
        if (!regex.test(phone)) {
            return { valid: false, error: 'El teléfono debe contener exactamente 8 dígitos numéricos' };
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
        const { nombre_comercio, descripcion_comercio, url_google, telefono, video_youtube, id_categoria } = data;

        let validationResult;

        validationResult = this.validateText(nombre_comercio);
        if (!validationResult.valid) return validationResult;

        validationResult = this.validateText(descripcion_comercio);
        if (!validationResult.valid) return validationResult;

        validationResult = this.validateText(url_google, "Url Google");
        if (!validationResult.valid) return validationResult;

        validationResult = this.validatePhone(telefono);
        if (!validationResult.valid) return validationResult;

        validationResult = this.validateText(video_youtube);
        if (!validationResult.valid) return validationResult;

        validationResult = this.validateId(id_categoria, "ID Categoría");
        if (!validationResult.valid) return validationResult;

        return { valid: true };
    }
}

module.exports = tipoDatos;
