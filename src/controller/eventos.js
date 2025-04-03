const {
    GetEventos,
    getEventoById,
    CreateEvento,
    updateEvento,
    deleteEvento
} = require('../models/eventos');
const tiposDatos = require('../validaciones/tipoEvento');

const getMethod = async (req, res) => {
    try {
        const eventos = await GetEventos();
        if (eventos.length > 0) {
            res.json({ success: true, data: eventos });
        } else {
            res.status(404).json({ success: false, message: 'No se encontraron eventos' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getMethodById = async (req, res) => {
    try {
        const { id } = req.params;

        let validation = tiposDatos.validateId(id, "id");
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        const evento = await getEventoById(id);
        if (evento.length !== 0) {
            res.json({ success: true, data: evento });
        } else {
            res.json({ success: false, message: 'Evento no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const postMethod = async (req, res) => {
    try {

        validation = tiposDatos.validateAll(req.body);
        if (!validation.valid) {
            return res.status(400).json({ success: false, error: validation.error });
        }
        // Convertir fecha y hora al formato correcto
        const date = new Date(req.body.fecha_evento);
        const fechaUTC = new Date(date + " UTC").toISOString().slice(0, 19).replace("T", " ");
        req.body.fecha_evento = fechaUTC;
        const resultado = await CreateEvento(req.body);
        if (resultado && resultado.affectedRows > 0) {
            res.status(201).json({ success: true, message: 'Evento creado exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al crear el evento' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



const updateMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        let validation = tiposDatos.validateId(id, "id");
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateAll(req.body);
        if (!validation.valid) {
            return res.status(400).json({ success: false, error: validation.error });
        }
        const date = new Date(req.body.fecha_evento);
        const fechaUTC = new Date(date + " UTC").toISOString().slice(0, 19).replace("T", " ");
        req.body.fecha_evento = fechaUTC;
        const resultado = await updateEvento(id, datosActualizados);
        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Evento actualizado exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al actualizar el evento o evento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const deleteMethod = async (req, res) => {
    try {
        const { id } = req.params;

        let validation = tiposDatos.validateId(id, "id");
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        const resultado = await deleteEvento(id);
        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Evento eliminado exitosamente' });
        } else {
            res.status(404).json({ success: false, message: 'Evento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    postMethod,
    getMethod,
    getMethodById,
    updateMethod,
    deleteMethod
};
