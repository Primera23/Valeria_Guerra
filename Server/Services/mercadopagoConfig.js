const mercadopago = require('mercadopago');

// Configuración para Sandbox (pruebas)
mercadopago.configure({
    sandbox: true, // Modo de pruebas
    access_token: 'TEST-XXXX...' // Tu access_token de prueba
});

module.exports = mercadopago;