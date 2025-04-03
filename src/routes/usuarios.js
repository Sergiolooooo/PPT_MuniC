const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');
const {validarRol} = require('../utils/validarRol');
const {validarPermisos} = require('../utils/validarPermisos');

const {
    getMethod,
    postMethod,
    updateMethod,
    deleteMethod,
    getMethodById,
    methodLogin,
    setNewPassword,
    getUserToken,
    methodLogout
} = require('../controller/usuarios');

const router = Router();

// Ruta para obtener todos los usuarios
//router.get('/', validateToken, validarRol(1,2), getMethod);
router.get('/', validateToken,  validarPermisos(1), getMethod);

// Ruta para obtener un usuario por ID
router.get('/:id', validateToken, validarPermisos(2), getMethodById);

// Ruta para registrar un nuevo usuario
router.post('/',  validateToken,  validarPermisos(3), postMethod);

// Ruta para el login de un usuario
router.post('/login', methodLogin);

// Ruta para el logout de un usuario
router.post('/logout',validateToken, methodLogout);

// Ruta para obtener datos del token de un usuario.
router.post('/get-user-cookie', validateToken, getUserToken);

// Ruta para actualizar un usuario
router.put('/:id', validateToken, updateMethod);

// Ruta para eliminar un usuario
router.delete('/:id', validateToken, deleteMethod);

// Ruta para restablecer la contraseña de un usuario (opcional)
router.post('/reset-password', setNewPassword);

module.exports = router;
