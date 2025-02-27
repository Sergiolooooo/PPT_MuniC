const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken'); 

const {
    postMethod,
    getMethod,
    getMethodById,
    updateMethod,
    deleteMethod,
    upload
} = require('../controller/album_imagenes');

const router = Router();

router.get('/', getMethod); 
router.get('/:id', getMethodById);
router.post('/', upload, postMethod); 
router.put('/:id',upload, updateMethod); 
router.delete('/:id', deleteMethod); 

module.exports = router;
