const mercadopago = require('mercadopago');

// Configuración
mercadopago.configurations.setAccessToken('TEST-4223787377291005-060517-aa36d9ee2db6c0ab432b99189719ec8e-1287411847'); // Tu token TEST

// Prueba básica
mercadopago.preferences.create({
  items: [{ title: "Test", unit_price: 100, quantity: 1 }]
})
.then(response => console.log('Success:', response.body.id))
.catch(error => console.error('Error:', error.message));