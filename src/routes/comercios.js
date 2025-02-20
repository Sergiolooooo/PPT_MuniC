const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');

const {
    postMethod,
    getMethod,
    getMethodById,
    updateMethod,
    deleteMethod,
    getComerciosByCategoria
} = require('../controller/comercios');

const router = Router();

//router.get('/',validateToken ,getMethod); ASI SE USA EL VALIDATE TOKEN

router.get('/', getMethod);
router.get('/categoria', getComerciosByCategoria);
router.get('/:id', getMethodById);
router.post('/', postMethod);
router.put('/:id', updateMethod);
router.delete('/:id', deleteMethod);

module.exports = router;