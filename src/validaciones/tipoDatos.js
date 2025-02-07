class tipoDatos {
    
    static validateFecha(fecha) {
        if (!fecha) {
            return { valid: false, error: 'Fecha no puede estar vacía' };
        }
        if (isNaN(Date.parse(fecha))) {
            return { valid: false, error: 'Fecha inválida' };
        }
        return { valid: true };
    }

    static validateMonto(monto) {
        if (monto === undefined || monto === null || monto === '') {
            return { valid: false, error: 'Monto no puede estar vacío' };
        }
        if (isNaN(monto) || monto < 0) {
            return { valid: false, error: 'Monto inválido' };
        }
        return { valid: true };
    }

    static validateArray(datos) {
        // Verificar si monto es undefined, null, una cadena vacía, o un array vacío
        if ((Array.isArray(datos) && datos.length === 0)) {
            return { valid: false, error: 'datos no puede estar vacío' };
        }
    
        return { valid: true };
    }

    static validateId(id) {
        if (id === undefined || id === null || id === '') {
            return { valid: false, error: 'No puede estar vacío' };
        }
        if (!Number.isInteger(id)) {
            return { valid: false, error: 'Inválido' };
        }
        return { valid: true };
    }

    static validateText(text) {
        if (text === undefined || text === null || text.trim() === '') {
            return { valid: false, error: 'No puede estar vacío' };
        }
        return { valid: true };
    }


    static validateHora(hora){
        if (!hora) {
            return { valid: false, error: 'Faltan datos requeridos' };
        }
        return { valid: true };
    }
    

    static validateAll(data) {
        const { fecha, hora, monto, idTipoRegistro, idRegistroMaquina, idUsuario } = data;

        if (!fecha || !hora || !monto || !idTipoRegistro || !idRegistroMaquina || !idUsuario) {
            return { valid: false, error: 'Faltan datos requeridos' };
        }

        let validationResult = this.validateFecha(fecha);
        if (!validationResult.valid) {
            return validationResult;
        }

        validationResult = this.validateMonto(monto);
        if (!validationResult.valid) {
            return validationResult;
        }

        validationResult = this.validateId(idTipoRegistro);
        if (!validationResult.valid) {
            return validationResult;
        }

        validationResult = this.validateId(idRegistroMaquina);
        if (!validationResult.valid) {
            return validationResult;
        }

        validationResult = this.validateId(idUsuario);
        if (!validationResult.valid) {
            return validationResult;
        }

        return { valid: true };
    }

}

module.exports = tipoDatos;