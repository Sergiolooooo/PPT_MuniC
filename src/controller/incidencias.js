const {
    CreateIncidencia,
    GetIncidencias,
    deleteIncidencia,
    getIncidenciaById,
    updateIncidencia
} = require('../models/incidencias');
const tiposDatos = require('../validaciones/tipoIncidencias');

const getMethodIncidencias = async (req, res) => {
    try {
        const incidencias = await GetIncidencias();
        if (incidencias.length > 0) {
            res.json({ success: true, data: incidencias });
        } else {
            res.status(404).json({ success: false, message: 'No se encontraron incidencias' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getMethodIncidenciaById = async (req, res) => {
    try {
        const { id } = req.params;

        let validation = tiposDatos.validateId(id, "id");
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        const incidencia = await getIncidenciaById(id);
        if (incidencia.length !== 0) {
            res.json({ success: true, data: incidencia });
        } else {
            res.json({ success: false, message: 'Incidencia no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const postMethodIncidencia = async (req, res) => {
    try {

        // Verificar si req.body.data existe y convertirlo a JSON si es un string
        if (req.body.data && typeof req.body.data === "string") {
            try {
                req.body = JSON.parse(req.body.data);
            } catch (jsonError) {
                return res.status(400).json({ success: false, message: "El JSON enviado tiene un formato incorrecto." });
            }
        }
        // Verificar si se subió una imagen
        if (req.files && req.files.length > 0) {
            // Agregar la imagen en formato Buffer a los datos
            req.body.imagen = req.files[0].buffer;
        }
        const validation = tiposDatos.validateAll(req.body);
        if (!validation.valid) {
            return res.status(400).json({ success: false, error: validation.error });
        }
        const resultado = await CreateIncidencia(req.body);
        if (resultado && resultado.affectedRows > 0) {
            res.status(201).json({ success: true, message: 'Incidencia creada exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al crear la incidencia' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateMethodIncidenciaController = async (req, res) => {
    try {
        const { id } = req.params;

        let validation = tiposDatos.validateId(id, "id_reporte_incidencia");
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        // Verificar si req.body.data existe y convertirlo a JSON si es un string
        if (req.body.data && typeof req.body.data === "string") {
            try {
                req.body = JSON.parse(req.body.data);
            } catch (jsonError) {
                return res.status(400).json({ success: false, message: "El JSON enviado tiene un formato incorrecto." });
            }
        }
        // Verificar si se subió una imagen
        if (req.files && req.files.length > 0) {
            // Agregar la imagen en formato Buffer a los datos
            req.body.imagen = req.files[0].buffer;
        }

        validation = tiposDatos.validateAll(req.body);
        if (!validation.valid) {
            return res.status(400).json({ success: false, error: validation.error });
        }

        const resultado = await updateIncidencia(id, req.body);
        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Incidencia actualizada exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al actualizar la incidencia o incidencia no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const deleteMethodIncidenciaController = async (req, res) => {
    try {
        const { id } = req.params;

        let validation = tiposDatos.validateId(id, "id_reporte_incidencia");
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        const resultado = await deleteIncidencia(id);
        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Incidencia eliminada exitosamente' });
        } else {
            res.status(404).json({ success: false, message: 'Incidencia no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    postMethodIncidencia,
    getMethodIncidencias,
    getMethodIncidenciaById,
    updateMethodIncidenciaController,
    deleteMethodIncidenciaController
};
