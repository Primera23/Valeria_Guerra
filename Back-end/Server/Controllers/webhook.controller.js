const { preference } = require('../Services/mercadopagoConfig');
const OrderModel = require('../Models/order.model');

const WebhookController = {
    recibirNotificacion: async (req, res) => {
        try {
            const paymentId = req.body.data.id;

            const mpResponse = await preference.payment.get(paymentId);
            const payment = mpResponse.body;

            const estado = payment.status; // approved, pending, rejected...
            const orderId = payment.external_reference;

            let nuevoEstado;
            if (estado === 'approved') nuevoEstado = 'paid';
            else if (estado === 'rejected') nuevoEstado = 'cancelled';
            else nuevoEstado = 'pending';

            await OrderModel.update({ status: nuevoEstado }, { where: { id: orderId } });

            console.log(`Orden ${orderId} actualizada a ${nuevoEstado}`);
            res.sendStatus(200);
        } catch (err) {
            console.error('Error en webhook:', err);
            res.sendStatus(500);
        }
    }
};

module.exports = WebhookController;
