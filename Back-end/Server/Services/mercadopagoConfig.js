// Services/mercadopagoConfig.js
const { MercadoPagoConfig, Preference } = require('mercadopago');

const mp = new MercadoPagoConfig({
  accessToken: 'TEST-4223787377291005-060517-aa36d9ee2db6c0ab432b99189719ec8e-1287411847'
});

module.exports = {
  preference: new Preference(mp)
};
