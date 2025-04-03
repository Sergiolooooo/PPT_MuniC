const database = require('../database/mysql');

const getAlbumImagenes = async () => {
    const [[rows]] = await database.query('CALL Sp_GetAlbumIncidencia();');
    return rows; 
};

const getAlbumImagenById = async (id) => {
    const [[rows]] = await database.query('CALL Sp_GetByIdAlbumIncidencia(?);', [id]);
    return rows;
};

const getAlbumImagenIncidenciaById = async (id) => {
    const [[rows]] = await database.query('CALL Sp_GetIncidenciaByIdAlbumIncidencia(?);', [id]);
    return rows;
};

const createAlbumIncidencia = async (datos) => {
    const { nombre_imagen, tipo_imagen, datos_imagen, id_incidencia } = datos;

    if (!nombre_imagen || !tipo_imagen || !datos_imagen || !id_incidencia) {
        throw new Error("Todos los campos son obligatorios.");
    }

    const [result] = await database.query(
        'CALL Sp_CreateAlbumIncidencia(?,?,?,?)',
        [nombre_imagen, tipo_imagen, datos_imagen, id_incidencia]
    );

    return result;
};

const updateAlbumImagen = async (id_imagen, datos) => {
    const { nombre_imagen = null, tipo_imagen = null, datos_imagen = null, id_incidencia = null } = datos; // Agregado id_incidencia
    const [rows] = await database.query('CALL Sp_UpdateAlbumIncidencia(?,?,?,?,?)', 
        [id_imagen, nombre_imagen, tipo_imagen, datos_imagen, id_incidencia] // Añadido id_incidencia
    );
    return rows;
};

const deleteAlbumImagen = async (id) => {
    const [rows] = await database.query('CALL Sp_DeleteAlbumIncidencia(?)', [id]);
    return rows;
};

module.exports = {
    createAlbumIncidencia,
    getAlbumImagenes,
    getAlbumImagenById,
    getAlbumImagenIncidenciaById,
    updateAlbumImagen,
    deleteAlbumImagen
};
