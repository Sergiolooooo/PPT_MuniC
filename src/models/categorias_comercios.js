const database = require('../database/mysql');

const getDatos = async () => {
    const [[rows]] = await database.query('CALL Sp_GetCategoriasComercios();');
    return rows;
};

const getDatosById = async (id) => {
    const [[rows]] = await database.query('CALL Sp_GetByIdCategoriasComercios(?);', [id]);
    return rows;
};

const createDatos = async (datos) => {
    const { nombre_categoria } = datos;
    const [[rows]] = await database.query('CALL Sp_CreateCategoriasComercios(?);', [nombre_categoria]);
    return rows;
};

const updateDatos = async (datos) => {
    const { id_categoria, nombre_categoria } = datos;
    const [[rows]] = await database.query('CALL Sp_UpdateCategoriasComercios(?, ?);', [id_categoria, nombre_categoria]);
    return rows;
};

const deleteDatos = async (id) => {
    const [[rows]] = await database.query('CALL Sp_DeleteCategoriasComercios(?);', [id]);
    return rows;
};

module.exports = {
    getDatos,
    getDatosById,
    createDatos,
    updateDatos,
    deleteDatos
};
