const database = require('../database/mysql');

const getRoles = async () => {
    const [[rows]] = await database.query('CALL Sp_GetRoles();');
    return rows;
}

const getRolById = async (id) => {
    const [[rows]] = await database.query('CALL Sp_GetByIdRol(?);', [id]);
    return rows;
};

const createRol = async (datos) => {
    const { nombre_rol } = datos;
    const [result] = await database.query('CALL Sp_CreateRol(?)', [nombre_rol]);

    return result;
};

const updateRol = async (id_rol,datos) => {
    const { nombre_rol, estado } = datos;
    const [rows] = await database.query('CALL Sp_UpdateRol(?,?,?);', [id_rol, nombre_rol, estado]);
    console.log(rows);
    return rows;
}

const deleteRol = async (id) => {
    const [rows] = await database.query('CALL Sp_DeleteRol(?)', [id]);
    return rows;
};

const getPermisosByIdRol = async (id_rol) => {  
    const [[rows]] = await database.query('CALL Sp_GetPermisosPorRol(?)', [id_rol])
    return rows;
};

module.exports = {
    getRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol,
    getPermisosByIdRol
};
