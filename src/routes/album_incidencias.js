const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');
const { validarArchivos } = require('../utils/multer');

const {
  postMethod,
  getMethod,
  getMethodById,
  updateMethod,
  deleteMethod,
  getMethodIncidenciasById
} = require('../controller/album_incidencias');

const router = Router();

router.get('/', validateToken, getMethod);
router.get('/incidencia/:id', validateToken, getMethodIncidenciasById);
router.get('/:id', validateToken, getMethodById);
router.post('/', validateToken, validarArchivos, postMethod);
router.put('/:id', validateToken, validarArchivos, updateMethod);
router.delete('/:id', validateToken, deleteMethod);

module.exports = router;
