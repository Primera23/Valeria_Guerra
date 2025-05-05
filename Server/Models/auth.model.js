const { pool } = require('../db');

const verifyIfexist = async(email)=>{
   const [results] = await pool.query('SELECT * FROM user WHERE correo_electronico = ?', [email])
   return results;
}

const registerUser = async(email,password) => {
    const [result] = await pool.execute(
        'INSERT INTO user (correo_electronico, password) VALUES (?, ?)',
        [email, password]
    );
    return result;
}

const registerUsuario = async(nombres, apellidos, userId)=>{
    pool.execute(
        'INSERT INTO usuario (nombre, apellido, user_id, permiso1) VALUES (?, ?, ?, ?)',
        [nombres, apellidos, userId, 'Usuario'])
}

module.exports = {
    verifyIfexist,
    registerUser,
    registerUsuario
}