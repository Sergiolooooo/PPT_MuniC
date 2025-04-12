const database = require('../database/mysql');
const { getMimeType } = require('../utils/getMimeType');

const getNoticias = async () => {
    const [[rows]] = await database.query('CALL Sp_GetNoticias();');

    const noticias = rows.map(noticia => {
        if (noticia.imagen && Buffer.isBuffer(noticia.imagen)) {
            const mimeType = getMimeType(noticia.imagen);
            const base64Image = noticia.imagen.toString("base64");
            noticia.imagen = `data:${mimeType};base64,${base64Image}`;
        } else {
            noticia.imagen = null;
        }
        return noticia;
    });

    return noticias;
};

const getNoticiaById = async (id_noticia) => {
    const [[rows]] = await database.query('CALL Sp_GetByIdNoticia(?);', [id_noticia]);
    return rows;
};

const createNoticia = async (datos) => {
    const { titulo, contenido, fecha_publicacion, id_usuario, imagen = null } = datos;
    const [result] = await database.query(
        'CALL Sp_CreateNoticia(?,?,?,?,?)',
        [titulo, contenido, fecha_publicacion, id_usuario, imagen]
    );

    return result;  // Devuelve el resultado de la consulta con affectedRows
};

const updateNoticia = async (id, datos) => {
    const { titulo = null, contenido = null, fecha_publicacion = null, id_usuario = null, imagen = null } = datos;
    const [rows] = await database.query('CALL Sp_UpdateNoticia(?,?,?,?,?,?)', 
        [id, titulo, contenido, fecha_publicacion, id_usuario, imagen]
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
