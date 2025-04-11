const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');
const { validarPermisos } = require('../utils/validarPermisos');

const {
    getIncidencias,
    getIncidenciaById,
    postIncidencia,
    updateIncidencia,
    deleteIncidencia
} = require('../controller/listado_incidencias');

const router = Router();

// Ruta para obtener todas las incidencias
//Ruta Utilizada en Android
router.get('/', getIncidencias);

// Ruta para obtener una incidencia por ID
router.get('/:id', validateToken, getIncidenciaById);

// Ruta para crear una nueva incidencia
router.post('/', validateToken,  postIncidencia);

// Ruta para actualizar una incidencia
router.put('/:id', validateToken, updateIncidencia);

// Ruta para eliminar una incidencia
router.delete('/:id', validateToken, deleteIncidencia);

module.exports = router;
