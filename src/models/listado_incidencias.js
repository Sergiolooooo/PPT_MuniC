const database = require('../database/mysql');

const getListadoIncidencias = async () => {
    const [[rows]] = await database.query('CALL Sp_GetListadoIncidencias();');
    return rows;
};

const getListadoIncidenciaById = async (id_incidencia) => {
    const [[rows]] = await database.query('CALL Sp_GetListadoIncidenciaById(?);', [id_incidencia]);
    return rows;
};

const createListadoIncidencia = async (datos) => {
    const { nombre_incidencia, descripcion_incidencia } = datos;
    const [result] = await database.query(
        'CALL Sp_CreateListadoIncidencia(?, ?)',
        [nombre_incidencia, descripcion_incidencia]
    );
    return result;
};

const updateListadoIncidencia = async (id_incidencia, datos) => {
    const { nombre_incidencia = null, descripcion_incidencia = null } = datos;
    const query = 'CALL Sp_UpdateListadoIncidencia(?, ?, ?)';
    const values = [id_incidencia, nombre_incidencia, descripcion_incidencia];
    const [rows] = await database.query(query, values);
    return rows;
};

const deleteListadoIncidencia = async (id_incidencia) => {
    const [rows] = await database.query('CALL Sp_DeleteListadoIncidencia(?)', [id_incidencia]);
    return rows;
};

module.exports = {
    getListadoIncidencias,
    getListadoIncidenciaById,
    createListadoIncidencia,
    updateListadoIncidencia,
    deleteListadoIncidencia
};
