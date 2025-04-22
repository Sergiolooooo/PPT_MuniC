const database = require('../database/mysql');
const { getMimeType } = require('../utils/getMimeType');

const GetIncidencias = async () => {
    const [[rows]] = await database.query('CALL Sp_GetIncidencias();');

    const incidencias = rows.map(incidencia => {
        if (incidencia.imagen && Buffer.isBuffer(incidencia.imagen)) {
            const mimeType = getMimeType(incidencia.imagen);
            const base64Image = incidencia.imagen.toString("base64");
            incidencia.imagen = `data:${mimeType};base64,${base64Image}`;
        } else {
            incidencia.imagen = null;
        }
        return incidencia;
    });

    return incidencias;
};

const getIncidenciaById = async (id_reporte_incidencia) => {
    const [[rows]] = await database.query('CALL Sp_GetIncidenciaById(?);', [id_reporte_incidencia]);
    return rows;
};

const CreateIncidencia = async (datos) => {
    const {
        nombre_reportante,
        cedula_reportante,
        telefono_reportante,
        descripcion_incidencia,
        id_incidencia,
        provincia,
        canton,
        distrito,
        direccion_exacta,
        imagen
    } = datos;

    const [result] = await database.query(
        'CALL Sp_CreateIncidencia(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            nombre_reportante,
            cedula_reportante,
            telefono_reportante,
            descripcion_incidencia,
            id_incidencia,
            provincia,
            canton,
            distrito,
            direccion_exacta,
            imagen
        ]
    );
    return result;
};


const updateIncidencia = async (id_reporte_incidencia, datos) => {
    const {
        nombre_reportante = null,
        cedula_reportante = null,
        telefono_reportante = null,
        id_incidencia = null,
        provincia = null,
        canton = null,
        distrito = null,
        direccion_exacta = null,
        estado = null,
        descripcion_incidencia = null, 
        imagen = null
    } = datos;

    const query = 'CALL Sp_UpdateIncidencia(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
        id_reporte_incidencia,
        nombre_reportante,
        cedula_reportante,
        telefono_reportante,
        id_incidencia,
        provincia,
        canton,
        distrito,
        direccion_exacta,
        estado,
        descripcion_incidencia, 
        imagen
    ];

    const [[updatedRow]] = await database.query(query, values);
    return updatedRow;
};



const deleteIncidencia = async (id_reporte_incidencia) => {
    const [rows] = await database.query('CALL Sp_DeleteIncidencia(?)', [id_reporte_incidencia]);
    return rows;
};

module.exports = {
    GetIncidencias,
    getIncidenciaById,
    CreateIncidencia,
    updateIncidencia,
    deleteIncidencia
};
