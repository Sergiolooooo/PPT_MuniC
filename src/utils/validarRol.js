function validarRol(..._roles) {
  return (req, res, next) => {
    // Verificar que se haya pasado un array de roles
    if (_roles.length === 0) {
      return res.status(400).json({ msg: 'Se debe proporcionar al menos un rol en formato array.'});
    }

    const tokenData = req.user; // O req.user dependiendo de cómo guardes el token
    console.log(tokenData.roles); // Verifica que el token esté llegando correctamente
    

    // Verifica si alguno de los roles del token está incluido en los roles permitidos
    if (tokenData && tokenData.roles && tokenData.roles.some(rol => _roles.includes(rol.nombre_rol))) {
      return next();
    } else {
      return res.status(401).send({ msg:'No tienes permiso para acceder a este recurso.'});
    }
  };
}

module.exports = { validarRol };

