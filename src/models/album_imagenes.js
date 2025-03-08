const database = require('../database/mysql');

const getAlbumImagenes = async () => {
    const [[rows]] = await database.query('CALL Sp_GetAlbumImagenes();');
    return rows; 
};

const getAlbumImagenById = async (id) => {
    const [[rows]] = await database.query('CALL Sp_GetByIdAlbumImagen(?);', [id]);
    return rows;
};

const createAlbumImagen = async (datos) => {
    const { nombre_imagen, tipo_imagen, datos_imagen, id_comercio } = datos; // Agregado id_comercio
    console.log(nombre_imagen);
    
    const [result] = await database.query(
        'CALL Sp_CreateAlbumImagen(?,?,?,?)', // Modificar llamada al procedimiento almacenado
        [nombre_imagen, tipo_imagen, datos_imagen, id_comercio] // Añadido id_comercio
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
    updateAlbumImagen,
    deleteAlbumImagen
};
