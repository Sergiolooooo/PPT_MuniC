const { 
  createRedSocial, 
  getRedesSociales, 
  getRedSocialById, 
  updateRedSocial, 
  deleteRedSocial,
  getDatosByComercio
} = require('../models/redes_sociales');

const tipoDatos = require('../validaciones/tipoRedSocial');

const getMethod = async (req, res) => {
  try {
      const redes = await getRedesSociales();

      if (redes.length > 0) {
          res.json({ success: true, data: redes });
      } else {
          res.status(404).json({ success: false, message: 'No se encontraron redes sociales' });
      }
      
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getMethodById = async (req, res) => {
  try {
      const { id } = req.params;
      if (!id) {
          return res.status(400).json({ success: false, message: 'ID de la red social no proporcionado.' });
      }
      const redSocial = await getRedSocialById(id);

      if (redSocial.length !== 0) {
          res.json({ success: true, data: redSocial });
      } else {
          res.json({ success: false, message: 'Red social no encontrada.' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getRedesByComercio = async (req, res) => {
    try {
        const { comercio } = req.query; // Si lo quieres como query string 

        if (!comercio) {
            return res.status(400).json({ success: false, message: 'ID de comercio no proporcionado.' });
        }
        const datos = await getDatosByComercio(comercio);
        if (datos.length > 0) {
            res.json({ success: true, data: datos });
        } else {
            res.status(404).json({ success: false, message: 'No se encontraron redes sociales para este comercio.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


const postMethod = async (req, res) => {
  try {
      const validation = tipoDatos.validateAll(req.body);
      if (!validation.valid) {
          return res.status(400).json({ success: false, error: validation.error });
      }

      const resultado = await createRedSocial(req.body);

      if (resultado && resultado.affectedRows > 0) {
          res.status(201).json({ success: true, message: 'Red social creada exitosamente' });
      } else {
          res.status(400).json({ success: false, message: 'Error al crear la red social' });
      }

  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};

const updateMethod = async (req, res) => {
  try {
      const { id } = req.params;
      const datosActualizados = req.body;

      const resultado = await updateRedSocial(id, datosActualizados);

      if (resultado && resultado.affectedRows > 0) {
          res.status(200).json({ success: true, message: 'Red social actualizada exitosamente' });
      } else {
          res.status(400).json({ success: false, message: 'Error al actualizar la red social o red social no encontrada' });
      }

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const deleteMethod = async (req, res) => {
  try {
      const { id } = req.params;

      if (!id || isNaN(id)) return res.status(400).json({ error: "ID inválido o no proporcionado" });

      const resultado = await deleteRedSocial(id);

      if (resultado && resultado.affectedRows > 0) {
          res.status(200).json({ success: true, message: 'Red social eliminada exitosamente' });
      } else {
          res.status(404).json({ success: false, message: 'Red social no encontrada' });
      }

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postMethod,
  getMethod,
  getMethodById,
  updateMethod,
  deleteMethod,
  getRedesByComercio
};
