const { createNoticia, getNoticias, getNoticiaById, updateNoticia, deleteNoticia } = require('../models/noticias');
const tiposDatos = require('../validaciones/tipoNoticias');

const getMethod = async (req, res) => {
    try {
        const noticias = await getNoticias();

        if (noticias.length > 0) {
            res.json({ success: true, data: noticias });
        } else {
            res.status(404).json({ success: false, message: 'No se encontraron noticias' });
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMethodById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: 'ID de noticia no proporcionado.' });
        }
        const noticia = await getNoticiaById(id);

        if (noticia.length !== 0) {
            res.json({ success: true, data: noticia });
        } else {
            res.json({ success: false, message: 'Noticia no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postMethod = async (req, res) => {
    try {
        const validation = tiposDatos.validateAll(req.body);
        if (!validation.valid) {
            return res.status(400).json({ success: false, error: validation.error });
        }

        const resultado = await createNoticia(req.body);

        if (resultado && resultado.affectedRows > 0) {
            res.status(201).json({ success: true, message: 'Noticia creada exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al crear la noticia' });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const resultado = await updateNoticia(id, datosActualizados);

        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Noticia actualizada exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al actualizar la noticia o noticia no encontrada' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMethod = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) return res.status(400).json({ error: "ID inválido o no proporcionado" });

        const resultado = await deleteNoticia(id);

        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Noticia eliminada exitosamente' });
        } else {
            res.status(404).json({ success: false, message: 'Noticia no encontrada' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    postMethod,
    getMethod,
    getMethodById,
    updateMethod,
    deleteMethod
};
