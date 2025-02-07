const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt;
        if (!token) {
            return res.status(401).json({ msg: 'No se encontró un token válido en las cookies' });
        }
        const data = jwt.verify(token, process.env.SECRET_KEY);
        
        req.tokenData = data;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'El token es inválido o ha expirado', error: err.message });
    }
};

module.exports = { validateToken };