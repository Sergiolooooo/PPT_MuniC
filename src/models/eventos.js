const database = require('../database/mysql');

const GetEventos = async () => {
    const [[rows]] = await database.query('CALL Sp_GetEventos();');
    return rows;
};

const getEventoById = async (id_evento) => {
    const [[rows]] = await database.query('CALL Sp_GetEventoById(?);', [id_evento]);
    return rows;
};

const CreateEvento = async (datos) => {
    const { nombre_evento, descripcion_evento, fecha_evento, lugar, id_usuario } = datos;
    const [result] = await database.query(
        'CALL Sp_CreateEvento(?, ?, ?, ?, ?)',
        [nombre_evento, descripcion_evento, fecha_evento, lugar, id_usuario]
    );
    return result;
};

const updateEvento = async (id_evento, datos) => {
    const { nombre_evento = null, descripcion_evento = null, fecha_evento = null, lugar = null, id_usuario = null } = datos;
    const query = 'CALL Sp_UpdateEvento(?, ?, ?, ?, ?, ?)';
    const values = [id_evento, nombre_evento, descripcion_evento, fecha_evento, lugar, id_usuario];
    const [rows] = await database.query(query, values);
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
