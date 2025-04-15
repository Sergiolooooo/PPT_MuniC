const { getPermisos } = require('../models/permisos');
require("../../env/config");

const getMethod = async (req, res) => {
    try {
        const datos = await getPermisos();

        if (datos.length !== 0) {
            res.json({ success: true, data: datos });
        } else {
            res.json({ success: false, message: 'Registros no encontrados.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getMethod
};
