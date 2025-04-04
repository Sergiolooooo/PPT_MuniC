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
        // Verificar si req.body.data existe y convertirlo a JSON si es un string
        if (req.body.data && typeof req.body.data === "string") {
            try {
                req.body = JSON.parse(req.body.data);
            } catch (jsonError) {
                return res.status(400).json({ success: false, message: "El JSON enviado tiene un formato incorrecto." });
            }
        }
        // Verificar si se subió una imagen
        if (req.files && req.files.length > 0) {
            // Agregar la imagen en formato Buffer a los datos
            req.body.imagen = req.files[0].buffer;
        }
        const { nombre_categoria } = req.body;
        let validation = tiposDatos.validateText(nombre_categoria);
        if (!validation.valid) return res.status(200).json({ error: validation.error });
        const resultado = await createDatos(req.body);
        console.log(resultado);
        
        if (resultado && resultado.affectedRows > 0) {
            res.status(201).json({ success: true, message: 'Categoria creada exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al crear la categoria' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMethod = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.body.data && typeof req.body.data === "string") {
            try {
                req.body = JSON.parse(req.body.data);
            } catch (jsonError) {
                return res.status(400).json({ success: false, message: "El JSON enviado tiene un formato incorrecto." });
            }
        }
        // Verificar si se subió una imagen
        if (req.files && req.files.length > 0) {
            // Agregar la imagen en formato Buffer a los datos
            req.body.imagen = req.files[0].buffer;
        }

        const datosActualizados = req.body;
        const resultado = await updateDatos(id, datosActualizados);

        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Categoria actualizada exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al actualizar la categoria' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




const deleteMethod = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await deleteDatos(id);
        res.status(200).json(resultado);

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
