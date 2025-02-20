class tipoDatos {
    
  static validateText(text, fieldName) {
      if (typeof text !== "string" || text.trim() === '') {
          return { valid: false, error: `${fieldName} debe ser un texto válido y no estar vacío` };
      }
      return { valid: true };
  }

  static validateUrl(url, fieldName) {
      const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*$/i;
      if (typeof url !== "string" || !urlPattern.test(url)) {
          return { valid: false, error: `${fieldName} debe ser una URL válida` };
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
      const { nombre_red_social, enlace, id_comercio } = data;

      let validationResult;

      validationResult = this.validateText(nombre_red_social, "Nombre de la Red Social");
      if (!validationResult.valid) return validationResult;

      validationResult = this.validateUrl(enlace, "Enlace");
      if (!validationResult.valid) return validationResult;

      validationResult = this.validateId(id_comercio, "ID Comercio");
      if (!validationResult.valid) return validationResult;

      return { valid: true };
  }
}

module.exports = tipoDatos;
