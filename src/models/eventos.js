const database = require('../database/mysql');
const { getMimeType } = require('../utils/getMimeType');

const GetEventos = async () => {
    const [[rows]] = await database.query('CALL Sp_GetEventos();');

    const eventos = rows.map(evento => {
        if (evento.imagen && Buffer.isBuffer(evento.imagen)) {
            const mimeType = getMimeType(evento.imagen);
            const base64Image = evento.imagen.toString("base64");
            evento.imagen = `data:${mimeType};base64,${base64Image}`;
        } else {
            evento.imagen = null;
        }
        return evento;
    });

    return eventos;
};

const getEventoById = async (id_evento) => {
    const [[rows]] = await database.query('CALL Sp_GetEventoById(?);', [id_evento]);
    return rows;
};


const CreateEvento = async (datos) => {
    const {
        nombre_evento, descripcion_evento, fecha_evento, fecha_fin, lugar, imagen, id_usuario} = datos;

    const [result] = await database.query(
        'CALL Sp_CreateEvento(?, ?, ?, ?, ?, ?, ?)',
        [
            nombre_evento, descripcion_evento, fecha_evento, fecha_fin, lugar, imagen, id_usuario
        ]
    );

    return result;
};


const updateEvento = async (id_evento, datos) => {
    const {
        nombre_evento = null,
        descripcion_evento = null,
        fecha_evento = null,
        fecha_fin = null,
        lugar = null,
        imagen = null
    } = datos;

    const [rows] = await database.query(
        'CALL Sp_UpdateEvento(?, ?, ?, ?, ?, ?, ?)',
        [id_evento, nombre_evento, descripcion_evento, fecha_evento, fecha_fin, lugar, imagen]
    );

    return rows;
};


const deleteEvento = async (id_evento) => {
    const [rows] = await database.query('CALL Sp_DeleteEvento(?)', [id_evento]);
    return rows;
};

module.exports = {
    GetEventos,
    getEventoById,
    CreateEvento,
    updateEvento,
    deleteEvento
};
