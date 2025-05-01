const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');
const { validarUnaImagen } = require('../utils/multerUnaImagen');
const {
    postMethod,
    getMethod,
    getMethodById,
    updateMethod,
    deleteMethod
} = require('../controller/noticias');

const router = Router();

// Descomenta esta línea si quieres proteger la ruta con token

router.get('/', getMethod);
router.get('/:id', getMethodById);
router.post('/', validarUnaImagen,validateToken, postMethod);
router.put('/:id', validarUnaImagen, validateToken, updateMethod);
router.delete('/:id', validateToken, deleteMethod);

module.exports = router;
