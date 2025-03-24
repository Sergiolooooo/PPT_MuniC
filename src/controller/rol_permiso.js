const {
    createRolPermiso,
    getRolesPermisos,
    getRolPermisoById,
    updateRolPermiso,
    deleteRolPermiso,
    getPermisosByRolId
} = require('../models/rol_permiso');

const getMethod = async (req, res) => {
    try {
        const rolesPermisos = await getRolesPermisos();
        if (rolesPermisos.length > 0) {
            res.json({ success: true, data: rolesPermisos });
        } else {
            res.status(404).json({ success: false, message: 'No se encontraron registros' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMethodById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: 'ID no proporcionado.' });
        }
        const rolPermiso = await getRolPermisoById(id);
        if (rolPermiso.length !== 0) {
            res.json({ success: true, data: rolPermiso });
        } else {
            res.json({ success: false, message: 'Registro no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getMethodPermisosByRolId = async (req, res) => {
    try {
        const  id_rol  = req.user.id_rol;
        if (! id_rol) {
            return res.status(400).json({ success: false, message: 'ID no proporcionado.' });
        }
        const rolPermiso = await getPermisosByRolId(id_rol);
        if (rolPermiso.length !== 0) {
            res.json({ success: true, data: rolPermiso });
        } else {
            res.json({ success: false, message: 'Registro no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postMethod = async (req, res) => {
    try {
        const { id_rol, id_permiso } = req.body;
        if (!id_rol || !id_permiso) {
            return res.status(400).json({ success: false, message: 'Faltan datos requeridos.' });
        }
        const resultado = await createRolPermiso(req.body);

        if (resultado && resultado.affectedRows > 0) {
            res.status(201).json({ success: true, message: 'Registro creado exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al crear el registro' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const resultado = await updateRolPermiso(id, datosActualizados);
        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Registro actualizado exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al actualizar el registro o no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMethod = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) return res.status(400).json({ error: 'ID inválido o no proporcionado' });
        const resultado = await deleteRolPermiso(id);
        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Registro eliminado exitosamente' });
        } else {
            res.status(404).json({ success: false, message: 'Registro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    postMethod,
    getMethod,
    getMethodPermisosByRolId,
    getMethodById,
    updateMethod,
    deleteMethod
};
