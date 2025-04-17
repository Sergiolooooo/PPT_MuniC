const database = require('../database/mysql');

const contarIncidenciasPendientes = async () => {
    const [[rows]] = await database.query('CALL Sp_ContarIncidenciasPendientes();');
    return rows[0]; // { total_pendientes: N }
};

const contarIncidenciasRealizadas = async () => {
    const [[rows]] = await database.query('CALL Sp_ContarIncidenciasRealizadas();');
    return rows[0]; // { total_realizadas: N }
};

const contarIncidenciasNoRealizadas = async () => {
    const [[rows]] = await database.query('CALL Sp_ContarIncidenciasNoRealizadas();');
    return rows[0]; // { total_no_realizadas: N }
};

const topIncidencias = async () => {
    const [[rows]] = await database.query('CALL Sp_TopIncidencias();');
    return rows;
};

module.exports = {
    contarIncidenciasPendientes,
    contarIncidenciasRealizadas,
    contarIncidenciasNoRealizadas,
    topIncidencias
};