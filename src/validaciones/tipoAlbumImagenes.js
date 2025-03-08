class tipoDatos {

  static validateText(text, fieldName) {
      if (typeof text !== "string" || text.trim() === '') {
          return { valid: false, error: `${fieldName} debe ser un texto válido y no estar vacío` };
      }
      return { valid: true };
  }

  static validateBlob(data, fieldName) {
      if (!(data instanceof Buffer) || data.length === 0) {
          return { valid: false, error: `${fieldName} debe ser un archivo válido (Buffer)` };
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
      const { nombre_imagen, tipo_imagen, datos_imagen } = data;

      let validationResult;

      // Validar nombre de la imagen
      validationResult = this.validateText(nombre_imagen, "Nombre de la Imagen");
      if (!validationResult.valid) return validationResult;

      // Validar tipo de imagen
      validationResult = this.validateText(tipo_imagen, "Tipo de Imagen");
      if (!validationResult.valid) return validationResult;

      // Validar los datos de la imagen (Buffer)
      validationResult = this.validateBlob(datos_imagen, "Datos de la Imagen");
      if (!validationResult.valid) return validationResult;

      return { valid: true };
  }
}

module.exports = tipoDatos;
