const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');
const { validarPermisos } = require('../utils/validarPermisos');

const {
    postMethodIncidencia,
    getMethodIncidencias,
    getMethodIncidenciaById,
    updateMethodIncidenciaController,
    deleteMethodIncidenciaController
} = require('../controller/incidencias');

const router = Router();

// Ruta para obtener todas las incidencias
router.get('/', validateToken, getMethodIncidencias);

// Ruta para obtener una incidencia por ID
router.get('/:id', validateToken, getMethodIncidenciaById);

// Ruta para crear una nueva incidencia
router.post('/', validateToken, postMethodIncidencia);

// Ruta para actualizar una incidencia
router.put('/:id', validateToken,  updateMethodIncidenciaController);

// Ruta para eliminar una incidencia
router.delete('/:id', validateToken,   deleteMethodIncidenciaController);

module.exports = router;
