class TipoEvento {
    static validateText(text,fieldName) {
        if (typeof text !== "string" || text.trim() === '') {
            return { valid: false, error: `El campo ${fieldName} debe ser un texto válido y no estar vacío` };
        }
        return { valid: true };
    }

    static validateDatetime(datetime, fieldName) {
        const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
        if (!regex.test(datetime)) {
            return { valid: false, error: `El campo ${fieldName} debe tener el formato YYYY-MM-DD HH:MM` };
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
      const { nombre_evento, descripcion_evento, fecha_evento, estado, id_categoria } = data;
      let validationResult;

      validationResult = this.validateText(nombre_evento, "nombre_evento");
      if (!validationResult.valid) return validationResult;

      validationResult = this.validateText(descripcion_evento, "descripcion_evento");
      if (!validationResult.valid) return validationResult;

      validationResult = this.validateDatetime(fecha_evento, "fecha_evento");
      if (!validationResult.valid) return validationResult;

      return { valid: true };
  }
}

module.exports = TipoEvento;
