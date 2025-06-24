// src/routes/webhook.js

const express = require('express');
const router = express.Router();
const OrderModel = require('../Models/order.model');
const mercadopago = require('../Services/mercadopagoConfig').preference;

// Para parsear JSON en el cuerpo
const WebhookController = require('../Controllers/webhook.controller');

router.post('/webhook-mercadopago', WebhookController.recibirNotificacion);

module.exports = router;
