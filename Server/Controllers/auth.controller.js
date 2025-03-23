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
        pass: 'yo z t s c m q d m n y i p y u u'
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
    const { correo_electronico, password1 } = req.body;

    try {
        // Buscar el usuario en la tabla `valeria_guerra user`
        const [users] = await pool.query('SELECT * FROM `user` WHERE correo_electronico = ?', [correo_electronico]);

        if (users.length > 0) {
            const user = users[0];
            // Comparar la contraseña hasheada
            if (await bcrypt.compare(password1, user.password)) {
                // Guardar el ID del usuario en la sesión
                req.session.userId = user.id;

                const sessionData = JSON.stringify(req.session);
                const expires = Math.floor(Date.now() / 1000) + 3600; // 1 hora de expiración

                // Verificar si ya existe una sesión con el mismo user_id
                const [existingSessions] = await pool.query(
                    'SELECT * FROM sessions WHERE user_id = ?',
                    [user.id]
                );

                if (existingSessions.length > 0) {
                    // Actualizar la sesión existente
                    await pool.execute(
                        'UPDATE sessions SET expires = ?, data = ? WHERE user_id = ?',
                        [expires, sessionData, user.id]
                    );
                } else {
                    // Insertar una nueva sesión
                    await pool.execute(
                        'INSERT INTO sessions (session_id, expires, data, user_id) VALUES (?, ?, ?, ?)',
                        [req.sessionID, expires, sessionData, user.id]
                    );
                }

                res.json({ message: 'Inicio de sesión exitoso', user });
            } else {
                res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

  
  // Ruta de cierre de sesión
const logout = (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Error al cerrar sesión' });
      }
      res.clearCookie('session_cookie_name');
      res.json({ message: 'Sesión cerrada' });
    });
  };
  
  // Ruta de perfil de usuario
const perfil = async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'No autorizado' });
    }
  
    try {
      // Realiza una consulta JOIN para obtener los datos de ambas tablas
      const [users] = await pool.query(`
        SELECT u.nombre, u.apellido, us.correo_electronico 
        FROM \`usuario\` u
        INNER JOIN \`user\` us
        ON u.id_usuario = us.id
        WHERE u.id_usuario = ?
      `, [req.session.userId]);
  
      if (users.length > 0) {
        const user = users[0];
        res.json({
          nombre: user.nombre,
          apellido: user.apellido,
          correo_electronico: user.correo_electronico
        });
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  const checkSession = (req, res) => {
    if (req.session.userId) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
};
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
module.exports = {
    registro,
    verifyEmail,
    login,
    perfil,
    logout,
    checkSession,
    sesionesActivas
};
