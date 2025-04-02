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

router.get('/',validateToken, getMethod);
router.get('/categoria',validateToken, getComerciosByCategoria);
router.get('/:id',validateToken, getMethodById);
router.post('/',validateToken, postMethod);
router.put('/:id',validateToken, updateMethod);
router.delete('/:id',validateToken, deleteMethod);

module.exports = router;