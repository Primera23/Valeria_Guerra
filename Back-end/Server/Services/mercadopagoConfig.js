const mercadopago = require('mercadopago');

mercadopago.access_token = 'TEST-4223787377291005-060517-aa36d9ee2db6c0ab432b99189719ec8e-1287411847';

module.exports = {
  payment: mercadopago.payment,
  merchantOrder: mercadopago.merchant_orders,
  preferences: mercadopago.preferences,
};




