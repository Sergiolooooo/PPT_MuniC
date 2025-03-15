const database = require('../database/mysql');

const getAlbumImagenes = async () => {
    const [[rows]] = await database.query('CALL Sp_GetAlbumImagenes();');
    return rows; 
};

const getAlbumImagenById = async (id) => {
    const [[rows]] = await database.query('CALL Sp_GetByIdAlbumImagen(?);', [id]);
    return rows;
};

const getAlbumImagenCommerceById = async (id) => {
    const [[rows]] = await database.query('CALL Sp_GetCommerceByIdAlbumImagen(?);', [id]);
    return rows;
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
