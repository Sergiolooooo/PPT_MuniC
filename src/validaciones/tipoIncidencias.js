class tipoIncidencia {
  static validateText(text, fieldName) {
    if (typeof text !== "string" || text.trim() === "") {
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

  static validateDatetime(datetime, fieldName) {
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    if (!regex.test(datetime)) {
        return { valid: false, error: `El campo ${fieldName} debe tener el formato YYYY-MM-DD HH:MM` };
    }
    return { valid: true };
}

  static validateNumber(value, fieldName) {
    if (isNaN(value)) {
      return { valid: false, error: `El campo ${fieldName} debe ser un número válido` };
    }
    return { valid: true };
  }

  static validateAll(data) {
    const {
      nombre_reportante,
      cedula_reportante,
      telefono_reportante,
      fecha_reporte,
      latitud,
      longitud,
      id_incidencia,
      estatus,
      provincia, 
      canton,
      distrito,
      direccion_exacta,
      estado
    } = data;

    let validationResult;

    validationResult = this.validateText(nombre_reportante, "nombre_reportante");
    if (!validationResult.valid) return validationResult;

    validationResult = this.validateNumber(cedula_reportante, "cedula_reportante");
    if (!validationResult.valid) return validationResult;

    // Validamos el teléfono si se proporciona
    if (telefono_reportante) {
      validationResult = this.validateNumber(telefono_reportante, "telefono_reportante");
      if (!validationResult.valid) return validationResult;
    }

    validationResult = this.validateDatetime(fecha_reporte, "fecha_reporte");
    if (!validationResult.valid) return validationResult;

    validationResult = this.validateNumber(latitud, "latitud");
    if (!validationResult.valid) return validationResult;

    validationResult = this.validateNumber(longitud, "longitud");
    if (!validationResult.valid) return validationResult;

    validationResult = this.validateId(id_incidencia, "id_incidencia");
    if (!validationResult.valid) return validationResult;

    validationResult = this.validateText(estatus, "estatus");
    if (!validationResult.valid) return validationResult;

    validationResult = this.validateText(provincia, "provincia");
    if (!validationResult.valid) return validationResult;

    validationResult = this.validateText(canton, "canton");
    if (!validationResult.valid) return validationResult;

    validationResult = this.validateText(distrito, "distrito"); 
    if (!validationResult.valid) return validationResult;

    validationResult = this.validateText(direccion_exacta, "direccion_exacta");
    if (!validationResult.valid) return validationResult;

    validationResult = this.validateText(estado, "estado");
    if (!validationResult.valid) return validationResult; 

    return { valid: true };
  }
}

module.exports = tipoIncidencia;
