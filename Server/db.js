const mysql = require('mysql2/promise');  // Usamos require en lugar de import
require('dotenv').config();  // Cargamos las variables de entorno

// Crear el pool de conexiones con la base de datos
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'valeria_guerra',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportamos el pool usando module.exports
module.exports = { pool };
