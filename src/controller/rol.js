const { getRoles, getRolById, createRol, updateRol, deleteRol } = require('../models/rol');
const tiposDatos = require('../validaciones/tipoDatos');
require("../../env/config");

const getMethod = async (req, res) => {
    try {
        const datos = await getRoles();

        if (datos.length !== 0) {
            res.json({ success: true, data: datos });
        } else {
            res.json({ success: false, message: 'Registros no encontrados.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMethodById = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = await getRolById(id);

        if (datos.length !== 0) {
            res.json({ success: true, data: datos });
        } else {
            res.json({ success: false, message: 'Registro no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postMethod = async (req, res) => {
    try {
        const { nombre_rol } = req.body;

        let validation = tiposDatos.validateText(nombre_rol);
        if (!validation.valid) return res.status(200).json({ error: validation.error });
 
        const resultado = await createRol(req.body);

        if (resultado && resultado.affectedRows > 0) {
            res.status(201).json({ success: true, message: 'Rol creado exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al crear el rol' });
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateMethod = async (req, res) => {
    try {
        const { id_rol, nombre_rol } = req.body;

        let validation = tiposDatos.validateId(id_rol);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateText(nombre_rol);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        const [resultado] = await updateRol(req.body);
        res.status(201).json({ success: true, message: resultado.Resultado });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





const deleteMethod = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) return res.status(400).json({ error: "ID inválido o no proporcionado" });

        const resultado = await deleteDatos(id);

        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Rol eliminado exitosamente' });
        } else {
            res.status(404).json({ success: false, message: 'Rol no encontrado' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




module.exports = {
    getMethod,
    postMethod,
    updateMethod,
    deleteMethod,
    getMethodById
};
