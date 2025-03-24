const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');
const {
    postMethod,
    getMethod,
    getMethodById,
    updateMethod,
    deleteMethod,
    getMethodPermisosByRolId
} = require('../controller/rol_permiso');

const router = Router();

// router.get('/', validateToken, getMethod); // Descomenta para proteger la ruta con token

router.get('/', getMethod);
router.get('/:id', getMethodById);
router.post('/', postMethod);
router.post('/userId', validateToken, getMethodPermisosByRolId); //ruta que se debe usar en el frontend para cargar los menus o paginas que puede ver el usuario segun los permisos
router.put('/:id', updateMethod);
router.delete('/:id', deleteMethod);

module.exports = router;
