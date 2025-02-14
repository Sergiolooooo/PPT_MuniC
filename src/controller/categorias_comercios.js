const { getCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria } = require('../models/categorias_comercios');
const tiposDatos = require('../validaciones/tipoDatos');
require("../../env/config");

const getMethod = async (req, res) => {
    try {
        const datos = await getCategorias();

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
        const datos = await getCategoriaById(id);

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
        const { nombre_categoria } = req.body;

        let validation = tiposDatos.validateText(nombre_categoria);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        const [resultado] = await createCategoria(req.body);
        res.status(201).json({ success: true, message: resultado.Resultado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMethod = async (req, res) => {
    try {
        const { id_categoria, nombre_categoria } = req.body;

        let validation = tiposDatos.validateId(id_categoria);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateText(nombre_categoria);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        const [resultado] = await updateCategoria(req.body);
        res.status(201).json({ success: true, message: resultado.Resultado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await deleteCategoria(id);
        res.status(201).json({ success: true, message: resultado.Resultado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getMethod,
    getMethodById,
    postMethod,
    updateMethod,
    deleteMethod
};
