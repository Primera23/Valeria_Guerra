const { Router } = require('express'); 
const router = Router();
const OrderItemModel = require('../Models/orderItem.model');
const {tVendido, ventasC } = require('../Controllers/payments.controller.js');

const OrderController = require('../Controllers/order.Controller');
router.post('/crear-orden', OrderController.createOrder);
router.get('/pago-fallido', (req, res) => {
  res.redirect('https://localhost:3000/Productos.html?error=pago');
});
router.get('/pago-exitoso', (req, res) => {
  res.redirect('https://localhost:3000/Productos.html?status=approved');
});

router.get('/pago-pendiente', (req, res) => {
  res.redirect('https://localhost:3000/Productos.html?status=pending');
});

router.get('/vendido', tVendido);
router.get('/ventas', ventasC );
module.exports = router;