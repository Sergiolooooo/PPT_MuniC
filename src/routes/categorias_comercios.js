const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');
const {
    getCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
} = require('../controller/categorias_comercios');

const router = Router();

router.get('/', validateToken, getCategorias);
router.get('/:id', validateToken, getCategoriaById);
router.post('/', validateToken, createCategoria);
router.put('/:id', validateToken, updateCategoria);
router.delete('/:id', validateToken, deleteCategoria);

module.exports = router;
