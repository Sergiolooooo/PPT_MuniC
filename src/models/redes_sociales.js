const database = require('../database/mysql');

const getRedesSociales = async () => {
    const [[rows]] = await database.query('CALL Sp_GetRedesSociales();');
    return rows;
};

const getRedSocialById = async (id_red_social) => {
    const [[rows]] = await database.query('CALL Sp_GetByIdRedSocial(?);', [id_red_social]);
    return rows;
};

const createRedSocial = async (datos) => {
    const { nombre_red_social, enlace, id_comercio } = datos;
    const [result] = await database.query(
        'CALL Sp_CreateRedSocial(?,?,?)',
        [nombre_red_social, enlace, id_comercio]
    );
    return result;
};

const updateRedSocial = async (id, datos) => {
    const { nombre_red_social = null, enlace = null, id_comercio = null } = datos;
    const [rows] = await database.query('CALL Sp_UpdateRedSocial(?,?,?,?)', 
        [id, nombre_red_social, enlace, id_comercio]
    );
    return rows;
};

const deleteRedSocial = async (id) => {
    const [rows] = await database.query('CALL Sp_DeleteRedSocial(?)', [id]);
    return rows;
};

module.exports = {
    createRedSocial,
    getRedesSociales,
    getRedSocialById,
    updateRedSocial,
    deleteRedSocial
};
