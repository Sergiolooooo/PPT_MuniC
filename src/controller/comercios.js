const { CreateDatos } = require('../models/comercios');
const tiposDatos = require('../validaciones/tipoDatos');
require("../../env/config");
const jwt = require('jsonwebtoken');

const postMethod = async (req, res) => {
    try {
        const { nombre_comercio, descripcion_comercio, latitud, longitud, telefono, video_youtube, id_categoria } = req.body;

        // Validar los datos recibidos
        let validation = tiposDatos.validateText(nombre_comercio);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateText(descripcion_comercio);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateText(latitud);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateText(longitud);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateId(telefono);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateText(video_youtube);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateId(id_categoria);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        // Llamada a la función que interactúa con la base de datos
        const resultado = await CreateDatos(req.body);

        // Comprobar si la inserción fue exitosa
        if (resultado && resultado.affectedRows > 0) {
            res.status(201).json({ success: true, message: 'Comercio creado exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al crear el comercio' });
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    postMethod
};