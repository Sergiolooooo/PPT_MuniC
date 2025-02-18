const { createProducto,getProductos, getProductoById, updateProducto, deleteProducto } = require('../models/productos');
const tiposDatos = require('../validaciones/tipoProducto');

const getMethod = async (req, res) => {
    try {
        const productos = await getProductos();

        if (productos.length > 0) {
            res.json({ success: true, data: productos });
        } else {
            res.status(404).json({ success: false, message: 'No se encontraron productos' });
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMethodById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: 'ID de producto no proporcionado.' });
        }
        const producto = await getProductoById(id);

        if (producto.length !== 0) {
            res.json({ success: true, data: producto });
        } else {
            res.json({ success: false, message: 'Producto no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postMethod = async (req, res) => {
    try {
        const validation = tiposDatos.validateAll(req.body);
        if (!validation.valid) {
            return res.status(400).json({ success: false, error: validation.error });
        }

        const resultado = await createProducto(req.body);

        if (resultado && resultado.affectedRows > 0) {
            res.status(201).json({ success: true, message: 'Producto creado exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al crear el producto' });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const resultado = await updateProducto(id, datosActualizados);

        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Producto actualizado exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al actualizar el producto o producto no encontrado' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMethod = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) return res.status(400).json({ error: "ID inválido o no proporcionado" });

        const resultado = await deleteProducto(id);

        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Producto eliminado exitosamente' });
        } else {
            res.status(404).json({ success: false, message: 'Producto no encontrado' });
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
    deleteMethod
};
