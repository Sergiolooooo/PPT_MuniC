const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');
const {validarRol} = require('../utils/validarRol');

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
router.get('/', validateToken, validarRol('super usuario','admin'), getMethod);

// Ruta para obtener un usuario por ID
router.get('/:id', validateToken, getMethodById);

// Ruta para registrar un nuevo usuario
router.post('/', postMethod);

// Ruta para el login de un usuario
router.post('/login', methodLogin);

// Ruta para obtener datos del token de un usuario.
router.post('/get-user-cookie', validateToken, getUserToken);

// Ruta para actualizar un usuario
router.put('/', validateToken, updateMethod);

// Ruta para eliminar un usuario
router.delete('/:id', validateToken, deleteMethod);

// Ruta para restablecer la contraseña de un usuario (opcional)
router.put('/reset-password', setNewPassword);

module.exports = router;
