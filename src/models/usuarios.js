const database = require('../database/mysql');

const getDatos = async () => {
    const [[rows]] = await database.query('CALL Sp_GetUsuarios();');
    return rows;
};

const getDatosById = async (id_usuario) => {
    const [[rows]] = await database.query('CALL Sp_GetByIdUsuario(?);', [id_usuario]);
    return rows;
};

const createDatos = async (datos) => {
    const { nombre_completo, email, password, estado } = datos;
    const rows = await database.query('CALL Sp_CreateUsuario(?,?,?,?)',
        [nombre_completo, email, password, estado]);
    return rows;
};

const updateDatos = async (datos) => {
    const { id_usuario, nombre_completo, email, estado } = datos;
    const [rows] = await database.query('CALL Sp_UpdateUsuarios(?,?,?,?)',
        [id_usuario, nombre_completo, email, estado]);
    return rows;
};

const deleteDatos = async (id_usuario) => {
    const [rows] = await database.query('CALL Sp_DeleteUsuarios(?);', [id_usuario]);
    return rows;
};

const datosLogin = async (email) => {
    const [[rows]] = await database.query('CALL Sp_GetUserByEmail(?);', [email]);
    return rows;
};

const establecerNuevaContrasena = async (datos) => {
    const { email, password } = datos;
    const [rows] = await database.query('CALL Sp_EstablecerNuevaContrasena(?,?);', [email, password]);
    return rows;
};

module.exports = {
    getDatos,
    createDatos,
    updateDatos,
    deleteDatos,
    getDatosById,
    datosLogin,
    establecerNuevaContrasena
};
