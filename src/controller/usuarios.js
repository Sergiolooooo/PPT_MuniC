const bcrypt = require('bcryptjs');
const { getDatos, getDatosById, createDatos, updateDatos, deleteDatos, datosLogin, establecerNuevaContrasena } = require('../models/usuarios');
const tiposDatos = require('../validaciones/tipoUsuario');
require("../../env/config");
const jwt = require('jsonwebtoken');
const { getRolUsuarioByIdUser } = require('../models/roles_usuarios');


const getMethod = async (req, res) => {
    try {
        const datos = await getDatos();
        if (datos.length !== 0) {
            res.json({ success: true, data: datos });
        } else {
            res.json({ success: false, message: 'Registros no encontrados.', data: datos });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMethodById = async (req, res) => {
    try {
        const { id } = req.params;
        let validation = tiposDatos.validateId(id,"id");
        if (!validation.valid) return res.status(200).json({ error: validation.error });
        const datos = await getDatosById(id);
        if (datos.length !== 0) {
            res.json({ success: true, data: datos });
        } else {
            res.json({ success: false, message: 'Registros no encontrados.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postMethod = async (req, res) => {
    try {
        const { password } = req.body;
        const validation = tiposDatos.validateAll(req.body);
        if (!validation.valid) {
            return res.status(400).json({ success: false, error: validation.error });
        }
        // Encriptar la password antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);
        // Crear el email con la password encriptada
        const [resultado] = await createDatos({ ...req.body, password: hashedPassword });
        if (resultado && resultado.affectedRows > 0) {
            res.status(201).json({ success: true, message: 'Usuario creado exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al crear el usuario' });
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: error.message });
    }
};

const updateMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_completo, email, estado, id_rol } = req.body;

        // Validaciones de datos de entrada
        let validation = tiposDatos.validateId(id,"id");
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateText(nombre_completo,"nombre_completo");
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateEmail(email);
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateEstado(estado,"estado");
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        validation = tiposDatos.validateId(id_rol,"id_rol");
        if (!validation.valid) return res.status(200).json({ error: validation.error });

        // Llamada al modelo para actualizar el email, pasando la nueva password encriptada si es necesario
        const resultado = await updateDatos(id,req.body);
        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Usuario actualizado exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al actualizar' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMethod = async (req, res) => {
    try {
        const { id } = req.params;
        let validation = tiposDatos.validateId(id,"id");
        if (!validation.valid) return res.status(200).json({ error: validation.error });
        const resultado = await deleteDatos(id);
        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Usuario eliminado exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al actualizar' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const methodLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validaciones de datos de entrada
        let validation = tiposDatos.validateEmail(email);
        if (!validation.valid) return res.status(400).json({ error: validation.error });

        validation = tiposDatos.validatePassword(password);
        if (!validation.valid) return res.status(400).json({ error: validation.error });

        // Llamada al modelo para obtener datos de login
        const usuarios = await datosLogin(email);
        if (usuarios.length === 0) {
            return res.status(401).json({ message: 'Credenciales no válidas.' });
        }

        // Comparar la password ingresada con la almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, usuarios[0].password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }
        // Obtener los roles del usuario (asegurarse de que sea un array vacío si no tiene roles)
        const roles = await getRolUsuarioByIdUser(usuarios[0].id_usuario) || [];

        // Crear objeto del usuario sin la contraseña
        const { password: _, ...usuarioSinPassword } = usuarios[0];
        const usuarioConRoles = { ...usuarioSinPassword, roles };

        // Generar token JWT
        const token = jwt.sign(
            { user: usuarioConRoles },
            process.env.SECRET_KEY_JWT,
            { expiresIn: '3h' }
        );

        // Configurar la cookie con el token
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000, // 1 hora
            sameSite: 'None',
            path: '/',
            domain: 'localhost'
        });

        res.json({ message: 'Inicio Exitoso.', user: usuarioConRoles });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const setNewPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        let validation = tiposDatos.validateEmail(email);
        if (!validation.valid) return res.status(400).json({ error: validation.error });

        let validationpass = tiposDatos.validatePassword(password);
        if (!validationpass.valid) return res.status(400).json({ error: validationpass.error });

        // Encriptar la password antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);
        // Llamada al modelo para establecer la nueva password
        const resultado = await establecerNuevaContrasena({ ...req.body, password: hashedPassword });
        if (resultado && resultado.affectedRows > 0) {
            res.status(200).json({ success: true, message: 'Contraseña actualizada exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Error al actualizar la contraseña' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//para obtener la informacion del token guardada en la cookie
const getUserToken = async (req, res) => {
    try {
        const tokenData = req.user;
        res.status(200).json({ success: true, message: tokenData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getMethod,
    getUserToken,
    postMethod,
    updateMethod,
    deleteMethod,
    getMethodById,
    methodLogin,
    setNewPassword
};
