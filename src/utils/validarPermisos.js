const database = require('../database/mysql');

/**
 * @param {...number} permisosRequeridos - Lista de permisos requeridos para acceder a la ruta.     
 * **/
function validarPermisos(...permisosRequeridos) {
  return async (req, res, next) => {
    try {
      const tokenData = req.user; // Suponiendo que el usuario está en req.user
      if (!tokenData || !tokenData.id_rol) {
        return res.status(403).json({ msg: 'Acceso denegado: No se encontró el rol del usuario.' });
      }
      const id_rol = tokenData.id_rol;
      // Llamar al procedimiento almacenado para obtener los permisos del rol
      const [rows] = await database.query('CALL Sp_GetPermisosPorRol(?)', [id_rol]);
      if (!rows[0] || rows[0].length === 0) {
        return res.status(401).json({ msg: 'No tienes permisos asignados.' });
      }
      const permisosUsuario = rows[0].map(row => row.numero);
      console.log('Permisos del usuario: =>', `${permisosUsuario.join(", ")}`);
      console.log('Permisos requeridos: =>', `${permisosRequeridos.join(", ")}`);
      // Verifica si el usuario tiene al menos uno de los permisos requeridos
      if (permisosUsuario.some(permiso => permisosRequeridos.includes(permiso))) {
        return next();
      } else {
        return res.status(401).json({ msg: `No tienes los siguientes numeros de permisos para acceder a este recurso: ${permisosRequeridos.join(', ')}.` });
      }
    } catch (error) {
      console.error('Error validando permisos:', error);
      return res.status(500).json({ msg: 'Error interno del servidor' });
    }
  };
}

module.exports = { validarPermisos };
