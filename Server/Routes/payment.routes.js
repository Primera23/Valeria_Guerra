const { Router } = require('express'); 
const router = Router();
const OrderController = require('../Controllers/order.Controller');
router.post('/crear-orden', OrderController.createOrder);
router.put('/actualizar-orden/:orderId', OrderController.updateOrderStatus);

module.exports = router;