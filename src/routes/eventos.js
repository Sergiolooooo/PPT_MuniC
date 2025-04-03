const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');
const { validarPermisos } = require('../utils/validarPermisos');

const {
    postMethod,
    getMethod,
    getMethodById,
    updateMethod,
    deleteMethod
} = require('../controller/eventos');

const router = Router();

// Ruta para obtener todos los eventos
router.get('/', validateToken, getMethod);

// Ruta para obtener un evento por ID
router.get('/:id', validateToken, getMethodById);

// Ruta para crear un nuevo evento
router.post('/', validateToken, postMethod);

// Ruta para actualizar un evento
router.put('/:id', validateToken, updateMethod);

// Ruta para eliminar un evento
router.delete('/:id', validateToken, deleteMethod);

module.exports = router;
