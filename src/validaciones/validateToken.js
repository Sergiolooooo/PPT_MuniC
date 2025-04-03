const jwt = require("jsonwebtoken");
const { getDatosById } = require('../models/usuarios');

const validateToken = async (req, res, next) => {
    try {
        // Obtiene el token de las cookies
        const token = req.cookies?.jwt
        if (!token) {
            return res.status(401).json({ msg: 'No se encontró un token válido en las cookies' });
        }
        // Verifica y decodifica el token
        const decodedData = jwt.verify(token, process.env.SECRET_KEY_JWT);
        if (!decodedData) {
            return res.status(401).json({ msg: 'Error al verficar el token' });
        }
        // Obtén el usuario desde la base de datos

        const datos = await getDatosById(decodedData.user.id_usuario);
        if (datos.length === 0) {
            return res.status(401).json({ msg: 'El usuario del token no es valido' });
        }
        // Establece los datos del usuario en la cookie para acceder a ellos más tarde
        req.user = decodedData.user;
        return next();
    } catch (error) {
        console.log(error);

        return res.status(500).json({ msg: 'Error inesperado!' });
    }
};

module.exports = { validateToken };