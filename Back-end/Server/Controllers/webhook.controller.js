const mercadopago = require('../Services/mercadopagoConfig');
const OrderModel = require('../Models/order.model');
const OrderController = require('./order.Controller');

const WebhookController = {
  recibirNotificacion: async (req, res) => {
    try {
      const { type, data } = req.body;

      if (type === 'payment' && data?.id) {
        const paymentId = data.id;

        const payment = await mercadopago.payment.get(paymentId);
        const orderData = payment.body;

        const status = orderData.status; // 'approved', 'in_process', 'rejected', etc.
        const externalReference = orderData.external_reference;
        const receiptUrl = orderData.transaction_details?.external_resource_url || null;

        console.log('📦 Webhook -> orderData:', JSON.stringify(orderData, null, 2));
        console.log('🔎 preference_id:', orderData.metadata?.preference_id || '❌ undefined');
        console.log('🔎 external_reference:', externalReference || '❌ undefined');

        // Buscar orden por paymentId
        const existingOrder = await OrderModel.findByPaymentId(paymentId);

        if (!existingOrder && externalReference) {
          // Solo crear la orden si no existe aún
          await OrderController.crearOrdenDesdeWebhook(orderData);
          console.log('✅ Orden creada desde webhook para:', externalReference);
        } else {
          console.log('⚠️ Orden ya existente para este paymentId');
        }

        // Siempre actualizar el estado y recibo, exista o no
        await OrderModel.updateByPaymentId(paymentId, {
          status: status, // Guardar el estado real
          payment_receipt_url: receiptUrl
        });

        return res.sendStatus(200);
      }

      res.sendStatus(400); // No era un evento de pago válido
    } catch (error) {
      console.error('❌ Error en webhook:', error);
      res.sendStatus(500);
    }
  },
};

module.exports = WebhookController;
