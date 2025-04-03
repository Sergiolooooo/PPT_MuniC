const { 
  createListadoIncidencia, 
  getListadoIncidencias, 
  getListadoIncidenciaById, 
  updateListadoIncidencia, 
  deleteListadoIncidencia 
} = require('../models/listado_incidencias');

const tiposDatos = require('../validaciones/tipoListadoIncidencias');

const getIncidencias = async (req, res) => {
  try {
      const incidencias = await getListadoIncidencias();
      if (incidencias.length > 0) {
          res.json({ success: true, data: incidencias });
      } else {
          res.status(404).json({ success: false, message: 'No se encontraron incidencias' });
      }
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};

const getIncidenciaById = async (req, res) => {
  try {
      const { id } = req.params;

      let validation = tiposDatos.validateId(id, "id_incidencia");
      if (!validation.valid) return res.status(200).json({ error: validation.error });

      const incidencia = await getListadoIncidenciaById(id);
      if (incidencia.length !== 0) {
          res.json({ success: true, data: incidencia });
      } else {
          res.json({ success: false, message: 'Incidencia no encontrada.' });
      }
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};

const postIncidencia = async (req, res) => {
  try {
      const validation = tiposDatos.validateAll(req.body);
      if (!validation.valid) {
          return res.status(400).json({ success: false, error: validation.error });
      }
      const resultado = await createListadoIncidencia(req.body);
      if (resultado && resultado.affectedRows > 0) {
          res.status(201).json({ success: true, message: 'Incidencia creada exitosamente' });
      } else {
          res.status(400).json({ success: false, message: 'Error al crear la incidencia' });
      }
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};

const updateIncidencia = async (req, res) => {
  try {
      const { id } = req.params;
      const datosActualizados = req.body;

      let validation = tiposDatos.validateId(id, "id_incidencia");
      if (!validation.valid) return res.status(200).json({ error: validation.error });

      validation = tiposDatos.validateAll(req.body);
      if (!validation.valid) {
          return res.status(400).json({ success: false, error: validation.error });
      }

      const resultado = await updateListadoIncidencia(id, datosActualizados);
      if (resultado && resultado.affectedRows > 0) {
          res.status(200).json({ success: true, message: 'Incidencia actualizada exitosamente' });
      } else {
          res.status(400).json({ success: false, message: 'Error al actualizar la incidencia o incidencia no encontrada' });
      }
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};

const deleteIncidencia = async (req, res) => {
  try {
      const { id } = req.params;

      let validation = tiposDatos.validateId(id, "id_incidencia");
      if (!validation.valid) return res.status(200).json({ error: validation.error });

      const resultado = await deleteListadoIncidencia(id);
      if (resultado && resultado.affectedRows > 0) {
          res.status(200).json({ success: true, message: 'Incidencia eliminada exitosamente' });
      } else {
          res.status(404).json({ success: false, message: 'Incidencia no encontrada' });
      }
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  postIncidencia,
  getIncidencias,
  getIncidenciaById,
  updateIncidencia,
  deleteIncidencia
};
