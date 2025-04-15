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

//router.get('/', validateToken, getMethod); // Descomenta esta línea si quieres proteger la ruta con token

router.get('/', getMethod);
router.get('/:id', getMethodById);
router.post('/', validarUnaImagen, postMethod);
router.put('/:id', validarUnaImagen,updateMethod);
router.delete('/:id', deleteMethod);

module.exports = router;
