const database = require('../database/mysql');

const getDatos = async () => {
    const [[rows]] = await database.query('CALL Sp_GetRoles();');
    return rows;
}

const getDatosById = async (id) => {
    const [[rows]] = await database.query('CALL Sp_GetRolById(?);', [id]);
    return rows;
};

const createDatos = async (datos) => {
    const { nombre_rol } = datos;
    const [[result]] = await database.query('CALL Sp_CreateRol(?)', [nombre_rol]);
    return result;
};

const updateDatos = async (datos) => {
    const { id_rol, nombre_rol } = datos;
    const [[rows]] = await database.query('CALL Sp_UpdateRol(?,?);', [id_rol, nombre_rol]);

    return rows;
}

const deleteDatos = async (id) => {
    const [[rows]] = await database.query('CALL Sp_DeleteRol(?)', [id]);
    return rows;
};

module.exports = {
    getDatos,
    getDatosById,
    createDatos,
    updateDatos,
    deleteDatos
};
