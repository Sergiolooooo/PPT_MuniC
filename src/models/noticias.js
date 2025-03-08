const database = require('../database/mysql');

const getNoticias = async () => {
    const [[rows]] = await database.query('CALL Sp_GetNoticias();');
    return rows;  // Devuelve las noticias obtenidas
};

const getNoticiaById = async (id_noticia) => {
    const [[rows]] = await database.query('CALL Sp_GetByIdNoticia(?);', [id_noticia]);
    return rows;
};

const createNoticia = async (datos) => {
    const { titulo, contenido, fecha_publicacion, id_usuario } = datos;
    const [result] = await database.query(
        'CALL Sp_CreateNoticia(?,?,?,?)',
        [titulo, contenido, fecha_publicacion, id_usuario]
    );

    return result;  // Devuelve el resultado de la consulta con affectedRows
};

const updateNoticia = async (id, datos) => {
    const { titulo = null, contenido = null, fecha_publicacion = null, id_usuario = null } = datos;
    const [rows] = await database.query('CALL Sp_UpdateNoticia(?,?,?,?,?)', 
        [id, titulo, contenido, fecha_publicacion, id_usuario]
    );
    return rows;
};

const deleteNoticia = async (id) => {
    const [rows] = await database.query('CALL Sp_DeleteNoticia(?)', [id]);
    return rows;
};

module.exports = {
    createNoticia,
    getNoticias,
    getNoticiaById,
    updateNoticia,
    deleteNoticia
};
