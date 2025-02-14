const database = require('../database/mysql');

const getDatos = async () => {
    const [[rows]] = await database.query('CALL sp_getusuarios();');
    return rows;
}

const getDatosById = async (id) => {
    const [[rows]] = await database.query('CALL sp_getbyidusuarios(?);', [id]);
    return rows;
};

const createDatos = async (datos) => {
    const { nombre_completo, email, password, id_rol } = datos;
    const [[rows]] = await database.query('CALL sp_CreateUsuarios(?,?,?,?);',
        [nombre_completo, email, password, id_rol]);

    return rows;
}

const updateDatos = async (datos) => {
    const { id_usuario, nombre_completo, email, password, id_rol } = datos;
    const [[rows]] = await database.query('CALL sp_updateusuarios(?,?,?,?,?)',
        [id_usuario, nombre_completo, email, password, id_rol]);

    return rows;
}

const deleteDatos = async (id_usuario) => {
    const [[rows]] = await database.query('CALL sp_deleteusuarios(?);', [id_usuario]);
    return rows;
}

const datosLogin = async (datos) => {
    const { email, password } = datos;
    const [[rows]] = await database.query('CALL sp_validatelogin(?,?);', [email, password]);
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
