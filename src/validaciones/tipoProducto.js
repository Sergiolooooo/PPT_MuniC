class tipoDatos {
    
  static validateText(text, fieldName) {
      if (typeof text !== "string" || text.trim() === '') {
          return { valid: false, error: `${fieldName} debe ser un texto válido y no estar vacío` };
      }
      return { valid: true };
  }

  static validateFloat(value, fieldName) {
      if (value === undefined || value === null || value === '' || isNaN(parseFloat(value))) {
          return { valid: false, error: `${fieldName} debe ser un número válido` };
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
      const { nombre_producto, descripcion_producto, precio, id_comercio } = data;

      let validationResult;

      validationResult = this.validateText(nombre_producto, "Nombre del Producto");
      if (!validationResult.valid) return validationResult;

      validationResult = this.validateText(descripcion_producto, "Descripción del Producto");
      if (!validationResult.valid) return validationResult;

      validationResult = this.validateFloat(precio, "Precio");
      if (!validationResult.valid) return validationResult;

      validationResult = this.validateId(id_comercio, "ID Comercio");
      if (!validationResult.valid) return validationResult;

      return { valid: true };
  }
}

module.exports = tipoDatos;
