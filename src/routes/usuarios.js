const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');

const {
    getMethod,
    postMethod,
    updateMethod,
    deleteMethod,
    getMethodById,
    methodLogin
} = require('../controller/usuarios');

const router = Router();


router.get('/', getMethod);
router.get('/:id', getMethodById);
router.post('/', postMethod);
router.post('/login', methodLogin);
router.put('/', updateMethod);
router.delete('/:id', deleteMethod);

module.exports = router;