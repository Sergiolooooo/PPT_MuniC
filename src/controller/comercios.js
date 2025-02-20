const { CreateDatos, GetDatos, getDatosById, updateDatos, deleteDatos, getDatosByCategoria  } = require('../models/comercios');
const tiposDatos = require('../validaciones/tipoDatos');
require("../../env/config");
const jwt = require('jsonwebtoken');

const getMethod = async (req, res) => {
    try {
        // Llamada al procedimiento almacenado para obtener los comercios
        const datos = await GetDatos();

        // Verificar si se obtuvieron resultados
        if (datos.length > 0) {
            res.json({ success: true, data: datos });
        } else {
            res.status(404).json({ success: false, message: 'No se encontraron comercios' });
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMethodById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: 'ID de comercio no proporcionado.' });
        }
        const datos = await getDatosById(id);

        if (datos.length !== 0) {
            res.json({ success: true, data: datos });
        } else {
            res.json({ success: false, message: 'Comercio no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getComerciosByCategoria = async (req, res) => {
    try {
        // Se espera que el parámetro 'categoria' se reciba en la query string
        const { categoria } = req.query;
        if (!categoria) {
            return res.status(400).json({ success: false, message: 'Categoría no proporcionada.' });
        }
        const datos = await getDatosByCategoria(categoria);

        if (datos.length > 0) {
            res.json({ success: true, data: datos });
        } else {
            res.status(404).json({ success: false, message: 'No se encontraron comercios para esa categoría.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const postMethod = async (req, res) => {
    try {
        const validation = tiposDatos.validateAll(req.body);
        if (!validation.valid) {
            return res.status(400).json({ success: false, error: validation.error });
        }

        // Llamada a la función que interactúa con la base de datos
        const resultado = await CreateDatos(req.body);

        // Comprobar si la inserción fue exitosa
        if (resultado && resultado.affectedRows > 0) {
            res.status(201).json({ success: true, message: 'Comercio creado exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al crear el comercio' });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


const updateMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        // Llamada al procedimiento almacenado
        const resultado = await updateDatos(id, datosActualizados);

        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Comercio actualizado exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al actualizar el comercio o comercio no encontrado' });
        }

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
            res.status(200).json({ success: true, message: 'Comercio eliminado exitosamente' });
        } else {
            res.status(404).json({ success: false, message: 'Comercio no encontrado' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    postMethod,
    getMethod,
    getMethodById,
    updateMethod,
    deleteMethod,
    getComerciosByCategoria
};