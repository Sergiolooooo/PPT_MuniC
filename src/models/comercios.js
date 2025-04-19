const database = require('../database/mysql');

const GetDatos = async () => {
    const [[rows]] = await database.query('CALL Sp_GetComercios();');
    return rows;  // Devuelve los resultados de la consulta
};


const getDatosById = async (id_comercio) => {
    const [[rows]] = await database.query('CALL Sp_GetByIdComercios(?);', [id_comercio]);
    return rows;
};

const getDatosByCategoria = async (categoria) => {
    const [[rows]] = await database.query('CALL Sp_GetComerciosByCategoria(?);', [categoria]);
    return rows; // Retorna la lista de comercios filtrados
};

const CreateDatos = async (datos) => {
    const {
        nombre_comercio, descripcion_comercio, url_google, telefono, video_youtube, id_categoria, id_usuario
    } = datos;

    const [result] = await database.query(
        'CALL Sp_CreateComercio(?,?,?,?,?,?,?)',
        [nombre_comercio, descripcion_comercio, url_google, telefono, video_youtube, id_categoria, id_usuario]
    );

    return result;
};
    
const updateDatos = async (id, datos) => {
    const { nombre_comercio = null, descripcion_comercio = null, url_google = null, telefono = null,
        video_youtube = null, id_categoria = null
    } = datos;

    const query = 'CALL Sp_UpdateComercio(?, ?, ?, ?, ?, ?, ?)';
    const values = [id, nombre_comercio, descripcion_comercio, url_google, telefono, video_youtube, id_categoria];

    const [rows] = await database.query(query, values);
    return rows;
};


const deleteDatos = async (id) => {
    const [rows] = await database.query('CALL Sp_DeleteComercio(?)', [id]);
    return rows;
};

module.exports = {
    CreateDatos,
    GetDatos,
    getDatosById,
    updateDatos,
    deleteDatos,
    getDatosByCategoria 
};