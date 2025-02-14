const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');
const {
    getMethod,
    getMethodById,
    postMethod,
    updateMethod,
    deleteMethod
} = require('../controller/categorias_comercios');

const router = Router();

router.get('/',  getMethod);
router.get('/:id', getMethodById);
router.post('/', postMethod);
router.put('/:id', updateMethod);
router.delete('/:id', deleteMethod);

module.exports = router;
