const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');
const { validarArchivos } = require('../utils/multer');
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
router.post('/', validarArchivos, postMethod);
router.put('/:id', validarArchivos, updateMethod);
router.delete('/:id', deleteMethod);

module.exports = router;
