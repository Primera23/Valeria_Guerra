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
const cors = require('cors');



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
  user: 'root',
  password: '',
  database: 'valeria_guerra',
  clearExpired: true,
  checkExpirationInterval: 900000
});

app.use(session({
  secret: 'tu_secreto_complejo_aqui',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: true,            // ✅ HTTPS requiere esto
    httpOnly: true,
    sameSite: 'none',        // ✅ Para puertos distintos
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(cors({
  origin: 'https://localhost:3000',  // Cambia esto a tu frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware de logs, parsing y rutas
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log('Sesión actual:', req.sessionID);
  console.log('Usuario en sesión:', req.session.userId);
  next();
});

// Rutas de tu aplicación
app.use(indexRoutes);
app.use(categoriaRoutes);
app.use(productoRoutes);
app.use(authRoutes);
app.use(paymentRoutes);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(express.static(path.join(__dirname, '..', 'public')));


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
