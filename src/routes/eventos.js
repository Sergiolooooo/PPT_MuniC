const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');
const { validarPermisos } = require('../utils/validarPermisos');
const { validarUnaImagen } = require('../utils/multerUnaImagen');

const {
    postMethod,
    getMethod,
    getMethodById,
    updateMethod,
    deleteMethod
} = require('../controller/eventos');

const router = Router();

// Ruta para obtener todos los eventos
// Ruta utiizada en Android
router.get('/', getMethod);

// Ruta para obtener un evento por ID
router.get('/:id', getMethodById);

// Ruta para crear un nuevo evento
router.post('/', validarUnaImagen, validateToken, postMethod);

// Ruta para actualizar un evento
router.put('/:id', validarUnaImagen, validateToken, updateMethod);

// Ruta para eliminar un evento
router.delete('/:id', validateToken, deleteMethod);

module.exports = router;
