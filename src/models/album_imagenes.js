const database = require('../database/mysql');
const { getMimeType } = require('../utils/getMimeType');

const getAlbumImagenes = async () => {
    const [[rows]] = await database.query('CALL Sp_GetAlbumImagenes();');

    const imagenes = rows.map(imagen => {
        if (imagen.datos_imagen && Buffer.isBuffer(imagen.datos_imagen)) {
            const mimeType = getMimeType(imagen.datos_imagen);
            const base64Image = imagen.datos_imagen.toString("base64");
            imagen.imagen = `data:${mimeType};base64,${base64Image}`;
        } else {
            imagen.imagen = null;
        }

        // ❗ Asegúrate de ELIMINAR los campos crudos que ya no usás
        delete imagen.datos_imagen;
        delete imagen.tipo_imagen;

        return imagen;
    });

    return imagenes;
};

const getAlbumImagenById = async (id) => {
    const [[rows]] = await database.query('CALL Sp_GetByIdAlbumImagen(?);', [id]);
    return rows;
};

const getAlbumImagenCommerceById = async (id) => {
    const [[rows]] = await database.query('CALL Sp_GetCommerceByIdAlbumImagen(?);', [id]);

    const imagenes = rows.map(imagen => {
        if (imagen.datos_imagen && Buffer.isBuffer(imagen.datos_imagen)) {
            const mimeType = getMimeType(imagen.datos_imagen);
            const base64Image = imagen.datos_imagen.toString("base64");
            imagen.imagen = `data:${mimeType};base64,${base64Image}`;
        } else {
            imagen.imagen = null;
        }

        delete imagen.datos_imagen;
        delete imagen.tipo_imagen;

        return imagen;
    });

    return imagenes;
};

const createAlbumImagen = async (datos) => {
    const { nombre_imagen, tipo_imagen, datos_imagen, id_comercio } = datos;

    if (!nombre_imagen || !tipo_imagen || !datos_imagen || !id_comercio) {
        throw new Error("Todos los campos son obligatorios.");
    }

    const [result] = await database.query(
        'CALL Sp_CreateAlbumImagen(?,?,?,?)',
        [nombre_imagen, tipo_imagen, datos_imagen, id_comercio]
    );

    return result;
};

const updateAlbumImagen = async (id_imagen, datos) => {
    const { nombre_imagen = null, tipo_imagen = null, datos_imagen = null, id_comercio = null } = datos; // Agregado id_comercio
    const [rows] = await database.query('CALL Sp_UpdateAlbumImagen(?,?,?,?,?)', 
        [id_imagen, nombre_imagen, tipo_imagen, datos_imagen, id_comercio] // Añadido id_comercio
    );
    return rows;
};

const deleteAlbumImagen = async (id) => {
    const [rows] = await database.query('CALL Sp_DeleteAlbumImagen(?)', [id]);
    return rows;
};

module.exports = {
    createAlbumImagen,
    getAlbumImagenes,
    getAlbumImagenById,
    getAlbumImagenCommerceById,
    updateAlbumImagen,
    deleteAlbumImagen
};
