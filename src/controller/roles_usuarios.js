const { 
  createRolUsuario, 
  getRolesUsuarios, 
  getRolUsuarioById, 
  updateRolUsuario, 
  deleteRolUsuario 
} = require('../models/roles_usuarios');

const getMethod = async (req, res) => {
  try {
      const rolesUsuarios = await getRolesUsuarios();
      if (rolesUsuarios.length > 0) {
          res.json({ success: true, data: rolesUsuarios });
      } else {
          res.status(404).json({ success: false, message: 'No se encontraron registros' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getMethodById = async (req, res) => {
  try {
      const { id } = req.params;
      if (!id) {
          return res.status(400).json({ success: false, message: 'ID no proporcionado.' });
      }
      const rolUsuario = await getRolUsuarioById(id);
      if (rolUsuario.length !== 0) {
          res.json({ success: true, data: rolUsuario });
      } else {
          res.json({ success: false, message: 'Registro no encontrado.' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const postMethod = async (req, res) => {
  try {
      const { id_usuario, id_rol } = req.body;
      if (!id_usuario || !id_rol) {
          return res.status(400).json({ success: false, message: 'Faltan datos requeridos.' });
      }
      const resultado = await createRolUsuario(req.body);
      console.log(resultado);
      
      if (resultado && resultado.affectedRows > 0) {
          res.status(201).json({ success: true, message: 'Registro creado exitosamente' });
      } else {
          res.status(400).json({ success: false, message: 'Error al crear el registro' });
      }
  } catch (error) {
    console.log(error);
    
      res.status(500).json({ success: false, error: error.message });
  }
};

const updateMethod = async (req, res) => {
  try {
      const { id } = req.params;
      const datosActualizados = req.body;
      const resultado = await updateRolUsuario(id, datosActualizados);
      if (resultado && resultado.affectedRows > 0) {
          res.status(200).json({ success: true, message: 'Registro actualizado exitosamente' });
      } else {
          res.status(400).json({ success: false, message: 'Error al actualizar el registro o no encontrado' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const deleteMethod = async (req, res) => {
  try {
      const { id } = req.params;
      if (!id || isNaN(id)) return res.status(400).json({ error: 'ID inválido o no proporcionado' });
      const resultado = await deleteRolUsuario(id);
      if (resultado && resultado.affectedRows > 0) {
          res.status(200).json({ success: true, message: 'Registro eliminado exitosamente' });
      } else {
          res.status(404).json({ success: false, message: 'Registro no encontrado' });
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
  deleteMethod
};
