// Usar 'require' en lugar de 'import'
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const https = require('https');  // Usamos https en lugar de http
const fs = require('fs');  // Para leer los archivos del certificado
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
// No necesitas fileURLToPath ni dirname para CommonJS


// Rutas de tu aplicación
const indexRoutes = require('./Routes/index.routes.js');
const categoriaRoutes = require('./Routes/categoria.routes.js');
const productoRoutes = require('./Routes/producto.routes.js');
const authRoutes = require('./Routes/auth.routes.js');
const paymentRoutes = require('./Routes/payment.routes.js')

// Crear la aplicación
const app = express();



const sessionStore = new MySQLStore({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'valeria_guerra'
});

app.use(session({
  key: 'session_cookie_name', // Nombre de la cookie
  secret: 'tu_secreto',       // Cadena secreta para firmar el ID de la sesión
  store: sessionStore,        // Almacenamiento en MySQL
  resave: false,              // No guardar la sesión si no ha habido cambios
  saveUninitialized: false,   // No guardar sesiones vacías
  cookie: {
    maxAge: 3600000,          // Tiempo de vida de la cookie (1 hora)
    secure: false,            // Solo enviar la cookie sobre HTTPS (false para desarrollo)
    httpOnly: true,           // La cookie no es accesible desde JavaScript
    sameSite: 'strict'        // La cookie solo se envía en solicitudes del mismo sitio
  }
}));

// Middleware de logs, parsing y rutas
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rutas de tu aplicación
app.use(indexRoutes);
app.use(categoriaRoutes);
app.use(productoRoutes);
app.use(authRoutes);

// Ruta estática para archivos públicos
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));



// Configuración de los certificados SSL
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, '..', 'ssl', 'private.key')),  // Ruta de tu clave privada
  cert: fs.readFileSync(path.join(__dirname, '..', 'ssl', 'certificate.crt')),  // Ruta de tu certificado
};

// Crear el servidor HTTPS
const { port } = require('./config.js'); // Cambié la forma de importar el valor de port
https.createServer(sslOptions, app).listen(port, () => {
  console.log(`Servidor HTTPS corriendo en https://localhost:${port}`);
});
