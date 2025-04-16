const { Router } = require('express');

const { getCantidadPendientes,
        getCantidadRealizadas,
        getCantidadNoRealizadas,
        getTopIncidencias
} = require('../controller/incidenciasDashboard');

const router = Router();

router.get('/incidenciasPendientes', getCantidadPendientes);
router.get('/incidenciasRealizadas', getCantidadRealizadas); 
router.get('/incidenciasNoRealizadas', getCantidadNoRealizadas);
router.get('/topIncidencias', getTopIncidencias);

module.exports = router;