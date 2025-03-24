const database = require('../database/mysql');

const getRolesPermisos = async () => {
    const [[rows]] = await database.query('CALL Sp_GetRolesPermisos();');
    return rows;
};

const getRolPermisoById = async (id_rol_permiso) => {
    const [[rows]] = await database.query('CALL Sp_GetByIdRolPermiso(?);', [id_rol_permiso]);
    return rows;
};

const getPermisosByRolId = async (id_rol) => {  
    const [[rows]] = await database.query('CALL Sp_GetPermisosPorRol(?)', [id_rol]);;
    return rows;
};

const createRolPermiso = async (datos) => {
    const { id_rol, id_permiso } = datos;
    const [result] = await database.query('CALL Sp_CreateRolPermiso(?, ?)',[id_rol, id_permiso]);
    return result;
};

const updateRolPermiso = async (id, datos) => {
    const { id_rol = null, id_permiso = null } = datos;
    const [rows] = await database.query('CALL Sp_UpdateRolPermiso(?, ?, ?)', 
        [id, id_rol, id_permiso]
    );
    return rows;
};

const deleteRolPermiso = async (id) => {
    const [rows] = await database.query('CALL Sp_DeleteRolPermiso(?)', [id]);
    return rows;
};

module.exports = {
    createRolPermiso,
    getRolesPermisos,
    getRolPermisoById,
    getPermisosByRolId,
    updateRolPermiso,
    deleteRolPermiso
};
