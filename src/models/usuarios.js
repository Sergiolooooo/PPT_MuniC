const database = require('../database/mysql');

const getDatos = async () => {
    const [[rows]] = await database.query('CALL Sp_GetUsuarios();');
    return rows;
}

const getDatosById = async (id) => {
    const [[rows]] = await database.query('CALL Sp_GetByIdUsuarios(?);', [id]);
    return rows;
};

const createDatos = async (datos) => {
    const { Nombre, Usuario, Correo, Contraseña, Id_Rol, Id_Puesto } = datos;
    const [[rows]] = await database.query('CALL Sp_CreateUsuarios(?,?,?,?,?,?);',
        [Nombre, Usuario, Correo, Contraseña, Id_Rol, Id_Puesto]);

    return rows;
}

const updateDatos = async (datos) => {
    const { Nombre, Usuario, Correo, Contraseña, Id_Rol, Id_Puesto, Id_Usuario } = datos;
    const [[rows]] = await database.query('CALL Sp_UpdateUsuarios(?,?,?,?,?,?,?)',
        [Nombre, Usuario, Correo, Contraseña, Id_Rol, Id_Puesto, Id_Usuario]);

    return rows;
}

const deleteDatos = async (dato) => {
    const [[rows]] = await database.query('CALL Sp_DeleteUsuarios(?);', [dato]);
    return rows;
}

const datosLogin = async (datos) => {
    const { usuario, contraseña } = datos;
    const [[rows]] = await database.query('CALL Sp_ValidateLogin(?,?);', [usuario, contraseña]);
    return rows;
}

module.exports = {
    getDatos,
    createDatos,
    updateDatos,
    deleteDatos,
    getDatosById,
    datosLogin
};