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
    getUserToken
} = require('../controller/usuarios');

const router = Router();

// Ruta para obtener todos los usuarios
//router.get('/', validateToken, validarRol('super usuario','admin'), getMethod);
router.get('/', validateToken,  validarPermisos('OBTENER_TODOS_LOS_USUARIOS'), getMethod);

// Ruta para obtener un usuario por ID
router.get('/:id', validateToken, validarPermisos('OBTENER_USUARIO_POR_ID'), getMethodById);

// Ruta para registrar un nuevo usuario
router.post('/',  validateToken, postMethod);

// Ruta para el login de un usuario
router.post('/login', methodLogin);

// Ruta para obtener datos del token de un usuario.
router.post('/get-user-cookie', validateToken, getUserToken);

// Ruta para actualizar un usuario
router.put('/:id', validateToken, updateMethod);

// Ruta para eliminar un usuario
router.delete('/:id', validateToken, deleteMethod);

// Ruta para restablecer la contraseña de un usuario (opcional)
router.post('/reset-password', setNewPassword);

module.exports = router;
