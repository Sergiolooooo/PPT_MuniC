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
        // Parsear el body si es string
        if (req.body.data && typeof req.body.data === "string") {
            try {
                req.body = JSON.parse(req.body.data);
            } catch (jsonError) {
                return res.status(400).json({ success: false, message: "El JSON enviado tiene un formato incorrecto." });
            }
        }

        // Convertir imagen
        if (req.file) {
            req.body.imagen = req.file.buffer;
        }

        // Convertir campos
        if (req.body.id_usuario) {
            req.body.id_usuario = parseInt(req.body.id_usuario);
        }

        // Validación
        const validation = tiposDatos.validateAll(req.body);
        if (!validation.valid) {
            return res.status(400).json({ success: false, error: validation.error });
        }

        // Guardar
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

        // Parsear body si viene como string
        if (req.body.data && typeof req.body.data === "string") {
            try {
                req.body = JSON.parse(req.body.data);
            } catch (jsonError) {
                return res.status(400).json({ success: false, message: "Datos incorrectos" });
            }
        }

        // Imagen opcional
        if (req.file) {
            req.body.imagen = req.file.buffer;
        }

        // Formatear fechas si existen
        const fecha_evento = req.body.fecha_evento
            ? new Date(req.body.fecha_evento + " UTC").toISOString().slice(0, 19).replace("T", " ")
            : null;

        const fecha_fin = req.body.fecha_fin
            ? new Date(req.body.fecha_fin + " UTC").toISOString().slice(0, 19).replace("T", " ")
            : null;

        // Preparar objeto de actualización
        const datosActualizados = {
            nombre_evento: req.body.nombre_evento || null,
            descripcion_evento: req.body.descripcion_evento || null,
            fecha_evento,
            fecha_fin,
            lugar: req.body.lugar || null,
            imagen: req.body.imagen || null
        };

        const resultado = await updateEvento(id, datosActualizados);

        if (resultado && resultado.affectedRows > 0) {
            return res.status(200).json({ success: true, message: "Evento actualizado exitosamente" });
        } else {
            return res.status(400).json({ success: false, message: "No se actualizó ningún evento" });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
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
