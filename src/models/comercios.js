const database = require('../database/mysql');


const CreateDatos = async (datos) => {
    const { nombre_comercio, descripcion_comercio, latitud, longitud, telefono, video_youtube, id_categoria } = datos;
    const [result] = await database.query(
        'CALL Sp_CreateComercio(?,?,?,?,?,?,?)',
        [nombre_comercio, descripcion_comercio, latitud, longitud, telefono, video_youtube, id_categoria]
    );

    return result;  // Devuelve el resultado de la consulta que contiene affectedRows
};



module.exports = {
    CreateDatos
};