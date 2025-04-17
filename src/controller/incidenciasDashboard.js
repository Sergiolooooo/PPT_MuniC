const {
    contarIncidenciasPendientes,
    contarIncidenciasRealizadas,
    contarIncidenciasNoRealizadas,
    topIncidencias
} = require('../models/incidenciasDashboard');

const getCantidadPendientes = async (req, res) => {
    try {
        const resultado = await contarIncidenciasPendientes();
        res.json({ success: true, data: resultado.total_pendientes });
    } catch (error) {
        console.error('Error al contar incidencias pendientes:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const getCantidadRealizadas = async (req, res) => {
    try {
        const resultado = await contarIncidenciasRealizadas();
        res.json({ success: true, data: resultado.total_realizadas });
    } catch (error) {
        console.error('Error al contar incidencias realizadas:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const getCantidadNoRealizadas = async (req, res) => {
    try {
        const resultado = await contarIncidenciasNoRealizadas();
        res.json({ success: true, data: resultado.total_no_realizadas });
    } catch (error) {
        console.error('Error al contar incidencias no realizadas:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const getTopIncidencias = async (req, res) => {
    try {
        const resultado = await topIncidencias();
        res.json({ success: true, data: resultado });
    } catch (error) {
        console.error('Error al obtener el top de incidencias:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = {
    getCantidadPendientes,
    getCantidadRealizadas,
    getCantidadNoRealizadas,
    getTopIncidencias
};