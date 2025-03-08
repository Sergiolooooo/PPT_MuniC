const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken'); 

const {
    postMethod,
    getMethod,
    getMethodById,
    updateMethod,
    deleteMethod
} = require('../controller/album_imagenes');
const { validarArchivos } = require('../utils/multer');

const router = Router();

router.get('/', getMethod); 
router.get('/:id', getMethodById);
router.post('/', validarArchivos, postMethod); 
router.put('/:id',validarArchivos, updateMethod); 
router.delete('/:id', deleteMethod); 

module.exports = router;
