const database = require('../database/mysql');

const getRoles = async () => {
    const [[rows]] = await database.query('CALL Sp_GetRoles();');
    return rows;
}

const getRolById = async (id) => {
    const [[rows]] = await database.query('CALL Sp_GetRolById(?);', [id]);
    return rows;
};

const createRol = async (datos) => {
    const { nombre_rol } = datos;
    const [[rows]] = await database.query('CALL Sp_CreateRol(?);', [nombre_rol]);

    return rows;
}

const updateRol = async (datos) => {
    const { id_rol, nombre_rol } = datos;
    const [[rows]] = await database.query('CALL Sp_UpdateRol(?,?);', [id_rol, nombre_rol]);

    return rows;
}

const deleteRol = async (id_rol) => {
    const [[rows]] = await database.query('CALL Sp_DeleteRol(?);', [id_rol]);
    return rows;
}

module.exports = {
    getRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol
};
