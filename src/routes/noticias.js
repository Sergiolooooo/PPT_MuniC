const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');
const { validarArchivos } = require('../utils/multer');
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
router.post('/', validarArchivos, postMethod);
router.put('/:id', validarArchivos,updateMethod);
router.delete('/:id', deleteMethod);

module.exports = router;
