const { getDatos, getDatosById, createDatos, updateDatos, deleteDatos } = require('../models/categorias_comercios');
const tiposDatos = require('../validaciones/tipoDatos');
require("../../env/config");

const getMethod = async (req, res) => {
    try {
        const datos = await getDatos();

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
        const datos = await getDatosById(id);

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
        console.log("📩 Datos recibidos en req.body:", req.body);

        // Verificar si el campo existe antes de validarlo
        if (!req.body.nombre_categoria) {
            return res.status(400).json({ success: false, error: "El campo 'nombre_categoria' es requerido." });
        }

        // Validar solo el nombre_categoria
        const validation = tiposDatos.validateText(req.body.nombre_categoria);
        console.log("🛠️ Resultado de validateText:", validation);

        if (!validation.valid) {
            return res.status(400).json({ success: false, error: validation.error });
        }

        // Insertar en la base de datos
        const resultado = await createDatos(req.body);

        if (resultado && resultado.affectedRows > 0) {
            res.status(201).json({ success: true, message: "Categoría creada exitosamente" });
        } else {
            res.status(400).json({ success: false, message: "Error al crear la categoría" });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};





const updateMethod = async (req, res) => {
    try {
        const { id_categoria, nombre_categoria } = req.body;

        let validation = tiposDatos.validateId(id_categoria);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateText(nombre_categoria);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        const [resultado] = await updateDatos(req.body);
        res.status(201).json({ success: true, message: resultado.Resultado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await deleteDatos(id);
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
