const multer = require('multer');
const {
    createAlbumImagen,
    getAlbumImagenes,
    getAlbumImagenById,
    updateAlbumImagen,
    deleteAlbumImagen
} = require('../models/album_imagenes');

// Configurar la libreria multer para almacenar imágenes en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array('files', 10);  // 'files' es el nombre del campo en el frontend, permite hasta 10 archivos

// Subir imágenes (uno o varios archivos)
const postMethod = async (req, res) => {
    try {

        // Verificar si se subieron las imágenes
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No se enviaron imágenes.' });
        }

        // Verificar si el id_comercio fue proporcionado
        const { id_comercio } = req.body;
        if (!id_comercio) {
            return res.status(400).json({ success: false, message: 'El id_comercio es obligatorio.' });
        }

        // Iterar sobre los archivos y registrar cada imagen
        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];
            const imagen = {
                nombre_imagen: file.originalname,
                tipo_imagen: file.mimetype,
                datos_imagen: file.buffer,
                id_comercio: id_comercio
            };

            // Llamar al procedimiento para cada imagen
            const result = await createAlbumImagen(imagen);
            if (!result || result.affectedRows === 0) {
                return res.status(400).json({ success: false, message: `Error al agregar la imagen ${file.originalname}.` });
            }
        }

        res.status(201).json({ success: true, message: 'Imágenes agregadas exitosamente.' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener todas las imágenes
const getMethod = async (req, res) => {
    try {
        const imagenes = await getAlbumImagenes();

        if (imagenes.length > 0) {
            res.json({ success: true, data: imagenes });
        } else {
            res.status(404).json({ success: false, message: 'No se encontraron imágenes.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una imagen por ID
const getMethodById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: 'ID de imagen no proporcionado.' });
        }

        const imagen = await getAlbumImagenById(id);

        if (imagen.length !== 0) {
            res.set('Content-Type', imagen[0].tipo_imagen);
            res.json({ success: true, data: imagen });
        } else {
            res.json({ success: false, message: 'Imagen no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una imagen
const updateMethod = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si se subieron imágenes
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No se enviaron imágenes.' });
        }

        // Verificar si se proporciona el id_comercio
        const { id_comercio } = req.body;
        if (!id_comercio) {
            return res.status(400).json({ success: false, message: 'El id_comercio es obligatorio.' });
        }
        const file = req.files[0];
        const imagen = {
            nombre_imagen: file.originalname,
            tipo_imagen: file.mimetype,
            datos_imagen: file.buffer,
            id_comercio: id_comercio
        };

        const resultado = await updateAlbumImagen(id, imagen);

        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Imagen actualizada exitosamente.' });
        } else {
            res.status(400).json({ success: false, message: 'Error al actualizar la imagen o imagen no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una imagen por ID
const deleteMethod = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) return res.status(400).json({ error: "ID inválido o no proporcionado" });

        const resultado = await deleteAlbumImagen(id);

        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Imagen eliminada exitosamente.' });
        } else {
            res.status(404).json({ success: false, message: 'Imagen no encontrada.' });
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
    deleteMethod,
    upload // Se exporta la configuración de multer para su uso en las rutas
};
