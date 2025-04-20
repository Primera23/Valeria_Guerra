const bcrypt = require('bcrypt');
const { pool } = require('../db.js');  // Asegúrate de que `pool` esté importado correctamente
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const session = require('express-session');  // Necesitas esta librería para sesiones
const { app } = require('express');
const correo = 'valeriaguerra2341@gmail.com';
// Configura el transporte de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // o cualquier otro servicio de correo
    auth: {
        user: correo,
        pass: 'ovgk feyq alqg lizp'
    }
});

// Objeto temporal para almacenar datos de usuario pendientes de verificación
const tempUserStore = {};

const registro = async (req, res) => {
    const { email, password, nombres, apellidos } = req.body;

    // Validaciones para los datos
    if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, message: 'El correo electrónico no es válido' });
    }
    if (typeof nombres !== 'string' || nombres.length < 3) {
        return res.status(400).json({ success: false, message: 'El nombre debe tener más de 3 caracteres' });
    }
    if (typeof apellidos !== 'string' || apellidos.length < 3) {
        return res.status(400).json({ success: false, message: 'El apellido debe tener más de 3 caracteres' });
    }

    try {
        // Verificar si el correo ya existe en la tabla `user`
        const [results] = await pool.execute('SELECT * FROM user WHERE correo_electronico = ?', [email]);
        if (results.length > 0) {
            return res.status(400).json({ success: false, message: 'Este correo electrónico ya está registrado' });
        }

        // Generar un token de verificación
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Almacenar temporalmente los datos del usuario
        tempUserStore[verificationToken] = {
            email,
            password,
            nombres,
            apellidos
        };

        // Enviar correo de verificación
        const mailOptions = {
            from: correo,
            to: email,
            subject: 'Verifica tu correo electrónico - Valeria Guerra',
            text: `Por favor, verifica tu correo electrónico haciendo clic en el siguiente enlace: https://localhost:3000/verify?token=${verificationToken}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error enviando correo:', error);
                return res.status(500).json({ success: false, message: 'Error al enviar el correo de verificación' });
            } else {
                console.log('Correo enviado:', info.response);
                return res.status(200).json({ success: true, message: 'Correo de verificación enviado. Por favor, verifica tu correo electrónico.' });
            }
        });

    } catch (err) {
        console.error('Error en registro de usuario:', err.message);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};

const verifyEmail = async (req, res) => {
    const { token } = req.query;

    // Buscar el token en el almacenamiento temporal
    const tempUserData = tempUserStore[token];

    if (!tempUserData) {
        return res.status(400).json({ success: false, message: 'Token de verificación inválido o expirado' });
    }

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(tempUserData.password, 10);

        // Insertar en la tabla `user`
        const [result] = await pool.execute(
            'INSERT INTO user (correo_electronico, password) VALUES (?, ?)',
            [tempUserData.email, hashedPassword]
        );

        const userId = result.insertId;

        if (!userId || userId <= 0) {
            console.error('El ID del usuario no es válido:', userId);
            return res.status(500).json({ success: false, message: 'No se pudo recuperar el ID del nuevo usuario' });
        }

        // Insertar en la tabla `usuario` (datos personales) con permiso1 por defecto como 'Usuario'
        await pool.execute(
            'INSERT INTO usuario (nombre, apellido, user_id, permiso1) VALUES (?, ?, ?, ?)',
            [tempUserData.nombres, tempUserData.apellidos, userId, 'Usuario']
        );

        // Eliminar los datos temporales
        delete tempUserStore[token];

        return res.status(201).json({ success: true, message: 'Usuario registrado y verificado exitosamente' });

    } catch (err) {
        console.error('Error en verificación de correo:', err.message);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};

const login = async (req, res) => {
    try {
        const { correo_electronico, password1 } = req.body;
        
        const [users] = await pool.query(
            'SELECT id, password FROM user WHERE correo_electronico = ?', 
            [correo_electronico]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        const user = users[0];
        const match = await bcrypt.compare(password1, user.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: 'Contraseña incorrecta'
            });
        }

        req.session.userId = user.id;
        
        // Datos para el frontend
        const [userData] = await pool.query(`
            SELECT u.nombre, u.apellido 
            FROM usuario u 
            WHERE u.user_id = ?
        `, [user.id]);

        res.json({
            success: true,
            message: 'Inicio de sesión exitoso',
            user: {
                id: user.id,
                nombre: userData[0].nombre,
                apellido: userData[0].apellido,
                email: correo_electronico
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        });
    }
};

  
  // Ruta de cierre de sesión
const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).json({
                success: false,
                message: 'Error al cerrar sesión'
            });
        }
        res.clearCookie('session_cookie_name');
        res.json({ 
            success: true,
            message: 'Sesión cerrada correctamente' 
        });
    });
  };
  
  // Ruta de perfil de usuario
const perfil = async (req, res) => {
    try {
        const [user] = await pool.query(`
            SELECT u.nombre, u.apellido, us.correo_electronico 
            FROM usuario u
            JOIN user us ON u.user_id = us.id
            WHERE u.user_id = ?
        `, [req.session.userId]);

        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        res.json({
            success: true,
            user: user[0]
        });

    } catch (error) {
        console.error('Error al obtener perfil:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener datos del usuario'
        });

        }    
    }

  const  checkSession = (req, res) => {
        try {
            if (!req.session.userId) {
                return res.json({ 
                    success: true, 
                    loggedIn: false 
                });
            }
    
            // Opcional: Devuelve datos básicos del usuario
            res.json({
                success: true,
                loggedIn: true,
                user: {
                    id: req.session.userId,
                    // Agrega más datos si es necesario
                }
            });
    
        } catch (error) {
            console.error('Error en checkSession:', error);
            res.status(500).json({
                success: false,
                message: 'Error al verificar sesión'
            });
        }
    }



const sesionesActivas = async (req, res) => {
    try {
      const query = 'SELECT COUNT(*) as total FROM sessions WHERE expires > ?';
      const [results] = await pool.query(query, [Math.floor(Date.now() / 1000)]);
      const totalSesiones = results[0].total;
      res.json({ totalSesiones });
    } catch (err) {
      console.error('Error al contar sesiones:', err);
      res.status(500).json({ error: 'Error al contar las sesiones' });
    }
  };


const adminLogin = async (req, res) => {
    try {
        const { correo_electronico, contraseña } = req.body;
        
        
    if (!correo_electronico || !contraseña) {
        return res.status(400).json({ result: false, message: 'Todos los campos son obligatorios' });
    }
        // 1. Verificar si el correo existe en la tabla administrador
        const [admins] = await pool.query(
            'SELECT id_admin, contraseña, permiso2, nombre FROM administrador WHERE correo_electronico = ?', 
            [correo_electronico]
        );

        if (admins.length === 0) {
            return res.status(404).json({
                result: false,
                message: 'Credenciales de administrador no válidas'
            });
        }

        const admin = admins[0];
        
        // 2. Verificar que el permiso sea 'Admin'
        if (admin.permiso2 !== 'Admin') {
            return res.status(403).json({
                result: false,
                message: 'No tienes permisos de administrador'
            });
        }

        // 3. Comparar contraseñas
        const match = await bcrypt.compare(contraseña, admin.contraseña);

        if (!match) {
            return res.status(401).json({
                result: false,
                message: 'Contraseña incorrecta'
            });
        }

        // 4. Crear sesión específica para administrador
        req.session.adminId = admin.id_admin;
        req.session.isAdmin = true;
        
        res.json({
            result: true,
            message: 'Inicio de sesión de administrador exitoso',
            admin: {
                id: admin.id_admin,
                nombre: admin.nombre,
                email: correo_electronico,
                rol: admin.permiso2
            }
        });

    } catch (error) {
        console.error('Error en adminLogin:', error);
        res.status(500).json({
            result: false,
            message: 'Error en el servidor durante el inicio de sesión de administrador'
        });
    }
};

const checkAdminSession = (req, res) => {
    try {
        if (!req.session.adminId || !req.session.isAdmin) {
            return res.json({ 
                success: true, 
                isAdmin: false,
                message: 'No hay sesión de administrador activa'
            });
        }

        res.json({
            success: true,
            isAdmin: true,
            admin: {
                id: req.session.adminId,
                // Puedes agregar más datos si es necesario
            }
        });

    } catch (error) {
        console.error('Error en checkAdminSession:', error);
        res.status(500).json({
            success: false,
            message: 'Error al verificar sesión de administrador'
        });
    }
};

const adminLogout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión de administrador:', err);
            return res.status(500).json({
                success: false,
                message: 'Error al cerrar sesión de administrador'
            });
        }
        res.clearCookie('session_cookie_name');
        res.json({ 
            success: true,
            message: 'Sesión de administrador cerrada correctamente' 
        });
    });
};

const adminPerfil = async (req, res) => {
    try {
        // Verificar primero que la sesión es de administrador
        if (!req.session.adminId || !req.session.isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado: se requieren privilegios de administrador'
            });
        }

        // Obtener los datos completos del administrador
        const [adminData] = await pool.query(`
            SELECT 
                id_admin, 
                correo_electronico, 
                nombre, 
                permiso2 as rol
            FROM administrador 
            WHERE id_admin = ?
        `, [req.session.adminId]);

        if (adminData.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Administrador no encontrado'
            });
        }

        const admin = adminData[0];
        
        res.json({
            success: true,
            admin: {
                id: admin.id_admin,
                email: admin.correo_electronico,
                nombre: admin.nombre,
                rol: admin.rol
                // Puedes agregar más campos si es necesario
            }
        });

    } catch (error) {
        console.error('Error al obtener perfil de administrador:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener datos del administrador'
        });
    }
};
// Middleware para verificar administrador
const isAdmin = (req, res, next) => {
    if (req.session.isAdmin) {
        return next();
    }

    // Decide la respuesta según el tipo de solicitud
    if (req.accepts('html')) {
        return res.status(404).redirect('/index.html');
    }
};
// Modifica tu exportación para incluir las nuevas funciones
module.exports = {
    registro,
    verifyEmail,
    login,
    perfil,
    logout,
    sesionesActivas,
    checkSession,
    adminLogin,
    adminLogout,
    checkAdminSession,
    isAdmin,
    adminPerfil
};
