const { getDatos, getDatosById, createDatos, updateDatos, deleteDatos, datosLogin } = require('../models/usuarios');
const tiposDatos = require('../validaciones/tipoDatos');
require("../../env/config");
const jwt = require('jsonwebtoken');

const getMethod = async (req, res) => {
    try {
        const datos = await getDatos();

        if (datos.length !== 0) {
            res.json({ success: true, data: datos });
        } else {
            res.json({ success: false, message: 'Registros no encontrados.', data: datos })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}

const getMethodById = async (req, res) => {
    try {
        const { id } = req.params
        const datos = await getDatosById(id);

        if (datos.length !== 0) {
            res.json({ success: true, data: datos });
        } else {
            res.json({ success: false, message: 'Registros no encontrados.' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const postMethod = async (req, res) => {
    try {
        const { Nombre, Usuario, Correo, Contraseña, Id_Rol, Id_Puesto } = req.body;

        let validation = tiposDatos.validateId(Id_Rol);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateId(Id_Puesto);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateText(Usuario);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateText(Correo);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateText(Nombre);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateText(Contraseña);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        const [resultado] = await createDatos(req.body);
        res.status(201).json({ success: true, message: resultado.Resultado })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMethod = async (req, res) => {
    try {
        const { Nombre, Usuario, Correo, Contraseña, Id_Rol, Id_Puesto, Id_Usuario } = req.body;

        let validation = tiposDatos.validateId(Id_Rol);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateId(Id_Puesto);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateId(Id_Usuario);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateText(Usuario);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateText(Correo);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateText(Nombre);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateText(Contraseña);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        const [resultado] = await updateDatos(req.body);
        res.status(201).json({ success: true, message: resultado.Resultado })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteMethod = async (req, res) => {
    try {
        const { id } = req.params;

        const [resultado] = await deleteDatos(id);
        res.status(201).json({ success: true, message: resultado.Resultado })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const methodLogin = async (req, res) => {
    try {

        const { usuario, contraseña } = req.body;

        let validation = tiposDatos.validateText(usuario);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateText(contraseña);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        const datos = await datosLogin(req.body);

        if (datos.length !== 0) {
            const token = jwt.sign(
                { user: usuario, rol: datos.Id_Rol },
                process.env.SECRET_KEY,
                { expiresIn: '3h' }
            );
            res.cookie("jwt", token, {
                httpOnly: true,  // No accesible desde JavaScript (protege contra XSS)
                secure: true,    // Establecer en 'true' si usas HTTPS
                maxAge: 3600000, // Duración de la cookie (en milisegundos)
                sameSite: 'None', // 'None' para cookies de terceros (entre dominios)
                path: '/',       // Define el path para el cual la cookie es válida
                domain: '.railway.app'
              });
            res.json({  message: 'Inicio Exitoso.', ID: datos });
        } else {
            res.json({ message: 'Credenciales no validas.' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getMethod,
    postMethod,
    updateMethod,
    deleteMethod,
    getMethodById,
    methodLogin
};