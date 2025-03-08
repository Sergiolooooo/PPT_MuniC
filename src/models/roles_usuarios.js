const database = require('../database/mysql');

const getRolesUsuarios = async () => {
    const [[rows]] = await database.query('CALL Sp_GetRolesUsuarios();');
    return rows;
};

const getRolUsuarioById = async (id_roles_usuarios) => {
    const [[rows]] = await database.query('CALL Sp_GetByIdRolesUsuarios(?);', [id_roles_usuarios]);
    return rows;
};
const getRolUsuarioByIdUser = async (id_user) => {  
    const [[rows]] = await database.query('CALL Sp_GetRolesByUserId(?);', [id_user]);
    return rows;
};

const createRolUsuario = async (datos) => {
    const { id_usuario, id_rol } = datos;
    const [result] = await database.query(
        'CALL Sp_CreateRolesUsuarios(?, ?)',
        [id_usuario, id_rol]
    );
    return result;
};

const updateRolUsuario = async (id, datos) => {
    const { id_usuario = null, id_rol = null } = datos;
    const [rows] = await database.query('CALL Sp_UpdateRolesUsuarios(?, ?, ?)', 
        [id, id_usuario, id_rol]
    );
    return rows;
};

const deleteRolUsuario = async (id) => {
    const [rows] = await database.query('CALL Sp_DeleteRolesUsuarios(?)', [id]);
    return rows;
};

module.exports = {
    createRolUsuario,
    getRolesUsuarios,
    getRolUsuarioById,
    getRolUsuarioByIdUser,
    updateRolUsuario,
    deleteRolUsuario
};
