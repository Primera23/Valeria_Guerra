const { Router } = require('express');
const router = Router();

const { getPedidosDelUsuarioActual,getPedidosParaAdmin } = require('../Controllers/pedido.controller');

router.get('/mis-pedidos', getPedidosDelUsuarioActual);

router.get('/admin/pedidos', getPedidosParaAdmin);

module.exports = router;