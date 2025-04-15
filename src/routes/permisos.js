const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken'); // Si decides usarlo
const { getMethod } = require('../controller/permisos');

const router = Router();

// Ruta GET para obtener todos los permisos
router.get('/', getMethod);

module.exports = router;
