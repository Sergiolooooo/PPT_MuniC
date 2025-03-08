const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');

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
router.post('/', postMethod);
router.put('/:id', updateMethod);
router.delete('/:id', deleteMethod);

module.exports = router;
