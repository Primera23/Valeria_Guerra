const { Router } = require('express'); 
const router = Router();

const OrderController = require('../Controllers/order.Controller');
router.post('/crear-orden', OrderController.createOrder);
router.put('/actualizar-orden/:orderId', OrderController.updateOrderStatus);
router.get('/pago-fallido', (req, res) => {
  res.redirect('https://localhost:3000/Productos.html?error=pago');
});
module.exports = router;