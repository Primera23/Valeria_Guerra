// Usar 'require' en lugar de 'import'
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const https = require('https');  // Usamos https en lugar de http
const fs = require('fs');  // Para leer los archivos del certificado
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
// No necesitas fileURLToPath ni dirname para CommonJS
const app = express();

const corsOptions = {
  origin: ["https://localhost:3000", "https://localhost:3001","https://5aa4-2800-484-df78-8c00-24b3-3404-9008-ed06.ngrok-free.app"], // Reemplaza con el puerto de tu frontend (React/Vite)
  credentials: true, // Si usas cookies/tokens de autenticación
  allowedHeaders: [
    'Content-Type', 
    'Authorization',
    'ngrok-skip-browser-warning' // <- Añade este header
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
};

app.use(cors(corsOptions));


// Configuración de sesión mejorada



const sessionStore = new MySQLStore({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'valeria_guerra',
  clearExpired: true,
  checkExpirationInterval: 900000
});

app.use(session({
  secret: 'mi_super_secreto',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: true, // Solo HTTPS
    httpOnly: true,
    sameSite: 'none', // ¡Crítico para cross-domain!
    maxAge: 24 * 60 * 60 * 1000,
    domain: undefined// Dominio padre para subdominios ngrok
  }
}));





// Middleware de logs, parsing y rutas
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log("🚀 Este backend está corriendo y configurando CORS correctamente");








// Rutas de tu aplicación

const categoriaRoutes = require('./Routes/categoria.routes.js');
const productoRoutes = require('./Routes/producto.routes.js');
const authRoutes = require('./Routes/auth.routes.js');
const paymentRoutes = require('./Routes/payment.routes.js')
const webhookRoutes = require('./Routes/webhook.routes.js');  // Asegúrate de importar las rutas del webhook

// Rutas de tu aplicación

app.use(categoriaRoutes);
app.use(productoRoutes);
app.use(authRoutes);
app.use(paymentRoutes);
app.use(webhookRoutes);  // Asegúrate de usar las rutas del webhook

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
