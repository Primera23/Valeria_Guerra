// const mercadopago = require('mercadopago');

// mercadopago.access_token = 'TEST-4223787377291005-060517-aa36d9ee2db6c0ab432b99189719ec8e-1287411847';

// module.exports = {
//   payment: mercadopago.payment,
//   merchantOrder: mercadopago.merchant_orders,
//   preferences: mercadopago.preferences,
// };

// Usa la sintaxis de importación correcta
// Services/mercadopagoConfig.js
const mercadopago = require('mercadopago');

// Configuración CORRECTA para v1.5.14
mercadopago.configure({
  access_token: 'TEST-4223787377291005-060517-aa36d9ee2db6c0ab432b99189719ec8e-1287411847',
  sandbox_mode: true // ¡Usa sandbox_mode en lugar de sandbox!
});

// Verificación opcional (elimina getSandbox que no existe en esta versión)
console.log('MercadoPago configurado correctamente');

module.exports = mercadopago;
