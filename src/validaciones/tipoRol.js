class TipoDatos {
  static validateText(text, fieldName) {
      if (typeof text !== "string" || text.trim() === '') {
          return { valid: false, error: `${fieldName} debe ser un texto válido y no estar vacío` };
      }
      return { valid: true };
  }

  static validateEstado(estado, fieldName) {
      if (typeof estado !== "string" || (estado !== 'A' && estado !== 'I')) {
          return { valid: false, error: `${fieldName} debe ser 'A' (Activo) o 'I' (Inactivo)` };
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
      const { nombre_rol } = data;
      let validationResult;
      validationResult = this.validateText(nombre_rol, "Nombre del Rol");
      if (!validationResult.valid) return validationResult;

      return { valid: true };
  }
}

module.exports = TipoDatos;
