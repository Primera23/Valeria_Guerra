const mercadopago = require('mercadopago');

// 1. Crear una instancia de configuración
const client = new mercadopago.MercadoPagoConfig({
  accessToken: 'TEST-4223787377291005-060517-aa36d9ee2db6c0ab432b99189719ec8e-1287411847',
  options: { sandbox: true } // Modo de pruebas
});

// 2. Inicializar los servicios que necesites (ej: Preference)
const preference = new mercadopago.Preference(client);

// 3. Exportar lo que necesites (ej: la instancia de Preference)
module.exports = preference;