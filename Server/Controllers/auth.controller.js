import bcrypt from 'bcrypt';
import { pool } from '../db.js';  // Asegúrate de que `pool` esté importado correctamente

export const registro = async (req, res) => {
    const { user, password, nombres, apellidos } = req.body;

    // Validaciones para los datos
    if (user.length < 3) {
        return res.status(400).json({ success: false, message: 'El nombre de usuario debe tener más de 3 caracteres' });
    }
    if (typeof nombres !== 'string' || nombres.length < 3) {
        return res.status(400).json({ success: false, message: 'El nombre debe tener más de 3 caracteres' });
    }
    if (typeof apellidos !== 'string' || apellidos.length < 3) {
        return res.status(400).json({ success: false, message: 'El apellido debe tener más de 3 caracteres' });
    }

    try {
        // Verificar si el usuario ya existe en la tabla `user`
        const [results] = await pool.execute('SELECT * FROM user WHERE username = ?', [user]);
        if (results.length > 0) {
            return res.status(400).json({ success: false, message: 'Este nombre de usuario ya existe' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar en la tabla `user`
        const [result] = await pool.execute(
            'INSERT INTO user (username, password) VALUES (?, ?)',
            [user, hashedPassword]
        );

        console.log(result);  // Depurar el valor de result

        // Obtener el ID recién generado (auto incrementado) de la inserción
        const userId = result.insertId;

        // Verificar si `userId` es válido
        if (!userId || userId <= 0) {
            console.error('El ID del usuario no es válido:', userId);
            return res.status(500).json({ success: false, message: 'No se pudo recuperar el ID del nuevo usuario' });
        }

        // Depurar el valor de userId antes de insertarlo en la tabla usuario
        console.log("userId:", userId);

        // Insertar en la tabla `usuario` (datos personales) con permiso1 por defecto como 'Usuario'
        const [usuarioResult] = await pool.execute(
            'INSERT INTO usuario (nombre, apellido, user_id, permiso1) VALUES (?, ?, ?, ?)',
            [nombres, apellidos, userId, 'Usuario']
        );

        console.log('Datos personales del usuario creados con éxito en la tabla `usuario`');

        // Responder con éxito
        return res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });

    } catch (err) {
        console.error('Error en registro de usuario:', err.message);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};


