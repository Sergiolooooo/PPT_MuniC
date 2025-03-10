const { getRoles, getRolById, createRol, deleteRol, updateRol } = require('../models/rol');
const tiposDatos = require('../validaciones/tipoRol');
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
        let validation = tiposDatos.validateId(id, "id");
        if (!validation.valid) return res.status(200).json({ error: validation.error });

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

        let validation = tiposDatos.validateText(nombre_rol, "nombre_rol");
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        const resultado = await createRol(req.body);

        if (resultado && resultado.affectedRows > 0) {
            res.status(201).json({ success: true, message: 'Rol creado exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al crear el rol' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};


const updateMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_rol, estado } = req.body;

        let validation = tiposDatos.validateId(id, "id");
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateText(nombre_rol, "nombre_rol");
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateEstado(estado, "estado");
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        const resultado = await updateRol(id, req.body);
        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Rol actualizado exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al actualizar Rol' });
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: error.message });
    }
};

const deleteMethod = async (req, res) => {
    try {
        const { id } = req.params;
        let validation = tiposDatos.validateId(id, "id");
        if (!validation.valid) return res.status(200).json({ error: validation.error });
        
        const resultado = await deleteRol(id);
        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Rol eliminado exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al eliminar el Rol' });
        }
    } catch (error) {
        // Si ocurre un error, manejarlo aquí
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            res.status(400).json({ error: error.message });
        } else {
            // Otro tipo de error
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
};





module.exports = {
    getMethod,
    postMethod,
    updateMethod,
    deleteMethod,
    getMethodById
};
