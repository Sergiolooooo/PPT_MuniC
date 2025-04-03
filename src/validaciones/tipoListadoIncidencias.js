class tipoListadoIncidencia {
  static validateText(text, fieldName) {
      if (typeof text !== "string" || text.trim() === '') {
          return { valid: false, error: `El campo ${fieldName} debe ser un texto válido y no estar vacío` };
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
      const { nombre_incidencia, descripcion_incidencia } = data;
      let validationResult;

      validationResult = this.validateText(nombre_incidencia, "nombre_incidencia");
      if (!validationResult.valid) return validationResult;

      validationResult = this.validateText(descripcion_incidencia, "descripcion_incidencia");
      if (!validationResult.valid) return validationResult;

      return { valid: true };
  }
}

module.exports = tipoListadoIncidencia;
