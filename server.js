const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();

// Certificados
const options = {
  key: fs.readFileSync('./Back-end/ssl/private.key'),
  cert: fs.readFileSync('./Back-end/ssl/certificate.crt')
};

// Servir archivos estáticos desde la carpeta frontend

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'Front-end', 'public')));  // Ruta corregida

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Front-end', 'public', 'index.html'));  // Ruta corregida
});

// Iniciar servidor
https.createServer(options, app).listen(3000, () => {
  console.log('Servidor front-end HTTPS corriendo en https://localhost:3000');
});
