const {
    createAlbumImagen,
    getAlbumImagenes,
    getAlbumImagenById,
    updateAlbumImagen,
    deleteAlbumImagen,
    getAlbumImagenCommerceById
} = require('../models/album_imagenes');
const tiposDatos = require('../validaciones/tipoAlbumImagenes');

// Subir imágenes (uno o varios archivos)
const postMethod = async (req, res) => {
    try {
        const { id_comercio } = req.body;
        let validation = tiposDatos.validateId(id_comercio, "id_comercio");
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        let validationImages = tiposDatos.validateOneOMoreImages(req.files, "files");
        if (!validationImages.valid) return res.status(200).json({ error: validationImages.error });

        let imagenesGuardadas = 0;
        let errores = [];

        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];

            const imagen = {
                nombre_imagen: file.originalname,
                tipo_imagen: file.mimetype,
                datos_imagen: file.buffer,
                id_comercio: id_comercio
            };

            try {
                await createAlbumImagen(imagen);
                imagenesGuardadas++;
            } catch (error) {
                errores.push(`Error al agregar ${file.originalname}: ${error.message}`);
            }
        }

        if (imagenesGuardadas === 0) {
            return res.status(400).json({ success: false, message: 'No se pudo guardar ninguna imagen.', errores });
        }

        res.status(201).json({
            success: true,
            message: `Se guardaron ${imagenesGuardadas} imágenes.`,
            errores: errores.length > 0 ? errores : null
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener todas las imágenes
const getMethod = async (req, res) => {
    try {
        const imagenes = await getAlbumImagenes();
        console.log(imagenes);

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
        let validation = tiposDatos.validateId(id, "id");
        if (!validation.valid) return res.status(200).json({ error: validation.error });
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
// Obtener una imagen por id de un comercio
const getMethodCommerceById = async (req, res) => {
    try {
        const { id } = req.params;
        let validation = tiposDatos.validateId(id, "id");
        if (!validation.valid) return res.status(200).json({ error: validation.error });
        const imagen = await getAlbumImagenCommerceById(id);

        if (imagen.length !== 0) {
            res.set('Content-Type', imagen[0].tipo_imagen);
            res.json({ success: true, data: imagen });
        } else {
            res.json({ success: false, message: 'Imagenes del comercio no encontradas.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una imagen
const updateMethod = async (req, res) => {
    try {
        const { id } = req.params;
        let validation = tiposDatos.validateId(id, "id");
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        const { id_comercio } = req.body;
        let validationCommerce = tiposDatos.validateId(id_comercio, "id_comercio");
        if (!validationCommerce.valid) return res.status(200).json({ error: validationCommerce.error });

        // Inicializar imagen vacía
        let imagen = {
            nombre_imagen: null,
            tipo_imagen: null,
            datos_imagen: null,
            id_comercio: id_comercio
        };

        // Si el usuario envía una nueva imagen, la procesamos
        if (req.files && req.files.length > 0) {
            const file = req.files[0];
            imagen.nombre_imagen = file.originalname;
            imagen.tipo_imagen = file.mimetype;
            imagen.datos_imagen = file.buffer;
        }

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
        let validation = tiposDatos.validateId(id, "id");
        if (!validation.valid) return res.status(200).json({ error: validation.error });
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
    getMethodCommerceById,
    getMethodById,
    updateMethod,
    deleteMethod
};
