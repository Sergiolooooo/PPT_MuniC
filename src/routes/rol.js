const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');

const {
    getMethod,
    postMethod,
    updateMethod,
    deleteMethod,
    getMethodById
} = require('../controller/rol');

const router = Router();


router.get('/', getMethod);
router.get('/:id', getMethodById);
router.post('/', postMethod);
router.put('/:id', updateMethod);
router.delete('/:id', deleteMethod);

module.exports = router;
