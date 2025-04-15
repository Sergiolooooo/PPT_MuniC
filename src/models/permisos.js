const database = require('../database/mysql');

const getPermisos = async () => {
    const [[rows]] = await database.query('CALL Sp_GetPermisos();');
    return rows;
};

module.exports = {
    getPermisos
};
