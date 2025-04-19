class TipoEvento {
    static validateText(text, fieldName) {
        if (typeof text !== "string" || text.trim() === '') {
            return { valid: false, error: `${fieldName} debe ser un texto válido y no estar vacío` };
        }
        return { valid: true };
    }

    static validateDate(date, fieldName) {
        if (!date || isNaN(Date.parse(date))) {
            return { valid: false, error: `${fieldName} debe ser una fecha válida` };
        }
        return { valid: true };
    }

    static validateId(id, fieldName) {
        if (!Number.isInteger(Number(id)) || Number(id) <= 0){
            return { valid: false, error: `${fieldName} debe ser un número entero válido` };
        }
        return { valid: true };
    }

    static validateAll(data) {
        const { nombre_evento, descripcion_evento, fecha_evento, fecha_fin, lugar, id_usuario } = data;
        let v;

        v = this.validateText(nombre_evento, "Nombre del evento");
        if (!v.valid) return v;

        v = this.validateText(descripcion_evento, "Descripción del evento");
        if (!v.valid) return v;

        v = this.validateDate(fecha_evento, "Fecha de inicio");
        if (!v.valid) return v;

        v = this.validateDate(fecha_fin, "Fecha de finalización");
        if (!v.valid) return v;

        v = this.validateText(lugar, "Lugar");
        if (!v.valid) return v;

        v = this.validateId(id_usuario, "ID de usuario");
        if (!v.valid) return v;

        return { valid: true };
    }
}

module.exports = TipoEvento;
