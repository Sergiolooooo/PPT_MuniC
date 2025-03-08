class TipoDatos {
    
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
      if (!Number.isInteger(id) || id <= 0) {
          return { valid: false, error: `${fieldName} debe ser un número entero válido` };
      }
      return { valid: true };
  }

  static validateAll(data) {
      const { titulo, contenido, fecha_publicacion, id_usuario } = data;

      let validationResult;

      validationResult = this.validateText(titulo, "Título");
      if (!validationResult.valid) return validationResult;

      validationResult = this.validateText(contenido, "Contenido");
      if (!validationResult.valid) return validationResult;

      validationResult = this.validateDate(fecha_publicacion, "Fecha de Publicación");
      if (!validationResult.valid) return validationResult;

      validationResult = this.validateId(id_usuario, "ID Usuario");
      if (!validationResult.valid) return validationResult;

      return { valid: true };
  }
}

module.exports = TipoDatos;
