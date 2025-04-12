const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');
const { validarUnaImagen } = require('../utils/multerUnaImagen');
const {
    getMethod,
    getMethodById,
    postMethod,
    updateMethod,
    deleteMethod
} = require('../controller/categorias_comercios');

const router = Router();

router.get('/', getMethod);
router.get('/:id', getMethodById);
router.post('/', validarUnaImagen, postMethod);
router.put('/:id', validarUnaImagen, updateMethod);
router.delete('/:id', deleteMethod);

module.exports = router;
