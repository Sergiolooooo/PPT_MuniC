const database = require('../database/mysql');

const getProductos = async () => {
    const [[rows]] = await database.query('CALL Sp_GetProductos();');
    return rows;  // Devuelve los resultados de la consulta
};

const getProductoById = async (id_producto) => {
    const [[rows]] = await database.query('CALL Sp_GetByIdProducto(?);', [id_producto]);
    return rows;
};

const getDatosByComercio = async (id) => {
    try {
        const [rows] = await database.query('CALL Sp_GetProductosByComercio(?);', [id]);
        return rows[0]; // Devuelve la lista de productos
    } catch (error) {
        throw error;
    }
};

const createProducto = async (datos) => {
    const { nombre_producto, descripcion_producto, precio, id_comercio } = datos;
    const [result] = await database.query(
        'CALL Sp_CreateProducto(?,?,?,?)',
        [nombre_producto, descripcion_producto, precio, id_comercio]
    );

    return result;  // Devuelve el resultado de la consulta que contiene affectedRows
};

const updateProducto = async (id, datos) => {
    const { nombre_producto = null, descripcion_producto = null, precio = null, id_comercio = null } = datos;
    const [rows] = await database.query('CALL Sp_UpdateProducto(?,?,?,?,?)', 
        [id, nombre_producto, descripcion_producto, precio, id_comercio]
    );
    return rows;
};

const deleteProducto = async (id) => {
    const [rows] = await database.query('CALL Sp_DeleteProducto(?)', [id]);
    return rows;
};

module.exports = {
    createProducto,
    getProductos,
    getProductoById,
    updateProducto,
    deleteProducto,
    getDatosByComercio
};
