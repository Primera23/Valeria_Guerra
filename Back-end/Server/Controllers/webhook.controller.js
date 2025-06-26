const { payment, merchantOrder } = require('../Services/mercadopagoConfig');

const OrderModel = require('../Models/order.model');

const WebhookController = {
  recibirNotificacion: async (req, res) => {
    try {
      const topic = req.query.topic;
      const id = req.query.id || req.body?.data?.id;

      if (!topic || !id) {
        console.error('❌ Falta id o topic en la notificación');
        return res.status(400).send('Falta id o topic');
      }

      let mpResponse;
      if (topic === 'payment') {
        mpResponse = await mercadopago.payment.get(id);
      } else if (topic === 'merchant_order') {
        mpResponse = await mercadopago.merchant_orders.get(id);
      } else {
        return res.status(400).send('Topic no soportado');
      }

      const data = mpResponse.body;

      // Aquí puedes extraer y actualizar tu modelo según corresponda,
      // ejemplo si es payment:
      if (topic === 'payment') {
        const estado = data.status; // approved, rejected, pending...
        const orderId = data.external_reference;

        let nuevoEstado;
        if (estado === 'approved') nuevoEstado = 'paid';
        else if (estado === 'rejected') nuevoEstado = 'cancelled';
        else nuevoEstado = 'pending';

        await OrderModel.update(orderId, {
          status: nuevoEstado,
          payment_id: data.id,
          payment_recapt_url: data.transaction_details?.external_resource_url || null,
        });

        console.log(`✅ Orden ${orderId} actualizada a ${nuevoEstado}`);
      }

      res.sendStatus(200);
    } catch (error) {
      console.error('❌ Error en webhook:', error);
      res.sendStatus(500);
    }
  },
};

module.exports = WebhookController;

