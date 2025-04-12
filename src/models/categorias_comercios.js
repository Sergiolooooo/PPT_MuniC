const database = require('../database/mysql');

const getDatos = async () => {
    const [[rows]] = await database.query('CALL Sp_GetCategoriasComercios();');

    const categorias = rows.map(categoria => {
        if (categoria.imagen && Buffer.isBuffer(categoria.imagen)) {
            const base64Image = categoria.imagen.toString("base64");
            categoria.imagen = `data:image/png;base64,${base64Image}`;
        } else {
            categoria.imagen = null;
        }
        return categoria;
    });

    return categorias;
};



const getDatosById = async (id) => {
    const [[rows]] = await database.query('CALL Sp_GetByIdCategoriasComercios(?);', [id]);
    return rows;
};

const createDatos = async (datos) => {
    const { nombre_categoria, imagen } = datos;
    const [result] = await database.query('CALL Sp_CreateCategoriasComercios(?,?)', [nombre_categoria, imagen]);
    return result;
};

const updateDatos = async (id, datos) => {
    const { nombre_categoria = null, imagen = null } = datos;
    const [rows] = await database.query('CALL Sp_UpdateCategoriasComercios(?,?,?)',
        [id, nombre_categoria, imagen]
    );
    return rows;
};

const deleteDatos = async (id) => {
    try {
        // Llamar al procedimiento almacenado
        await database.query('CALL Sp_DeleteCategoriasComercios(?);', [id]);
        return { success: true, message: "Categoría eliminada correctamente." };
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            throw new Error("No se puede eliminar la categoría porque tiene comercios asociados.");
        }
        throw error;
    }
};


module.exports = {
    getDatos,
    getDatosById,
    createDatos,
    updateDatos,
    deleteDatos
};
