const OrderModel = require('../Models/order.model');
const OrderItemModel = require('../Models/orderItem.model');
const mercadopago = require('../Services/mercadopagoConfig');

// 🧠 Simulación: en el futuro debes guardar el pendingOrder en la BD y consultarlo por preferenceId
const PendingOrderModel = require('../Models/PendingOrderModel');

const OrderController = {
   createOrder: async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ result: false, message: 'Inicie sesión' });
        }

        const { items, total } = req.body;
        if (!items || !total) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        const userId = req.session.userId;
        const baseUrl = 'https://3f33-2800-484-df78-8c00-5c2c-817f-e96b-5fd5.ngrok-free.app';

        const preferencePayload = {
            items: items.map(item => ({
                title: item.nombre.substring(0, 50),
                unit_price: Number(item.precio),
                quantity: Number(item.cantidad),
                currency_id: 'COP',
                ...(item.imagen && { picture_url: `${baseUrl}/uploads/${item.imagen}` })
            })),
            back_urls: {
                success: `${baseUrl}/pago-exitoso`,
                failure: `${baseUrl}/pago-fallido`,
                pending: `${baseUrl}/pago-pendiente`
            },
            auto_return: 'approved',
            binary_mode: true,
            notification_url: `${baseUrl}/webhook-mercadopago`,
            external_reference: userId.toString(),
            metadata: {
                user_id: userId
            }
        };

        // Crear preferencia en Mercado Pago
        const response = await mercadopago.preferences.create(preferencePayload);
        const preference = response.body;
        const preferenceId = preference.id;

                console.log('🛒 pendingOrder a guardar:', {
        user_id: userId,
        preference_id: preference.id,
        external_reference: userId.toString(),
        total,
        items: JSON.stringify(items)
        });
        // Guardar orden pendiente
        await PendingOrderModel.create({
        user_id: userId,
        preference_id: preference.id,
        external_reference: userId.toString(),  // <--- clave para enlazar desde el webhook
        total,
        items: JSON.stringify(items),
        created_at: new Date()
      });

        // Enviar al cliente el preferenceId
        res.json({
            result: true,
            message: 'Preferencia creada',
            preferenceId
        });

    } catch (error) {
        console.error('Error al crear preferencia:', error);
        res.status(500).json({ error: 'Error al iniciar el pago' });
    }
},

    confirmOrder: async (req, res) => {
        try {
            const { preferenceId, paymentId } = req.body;

            const pendingOrder = pendingOrders[preferenceId];
            if (!pendingOrder || req.session.userId !== pendingOrder.userId) {
                return res.status(400).json({ error: 'Orden no encontrada' });
            }

            const nuevaOrden = await OrderModel.create({
                user_id: pendingOrder.userId,
                amount: pendingOrder.total,
                status: 'pending',
                payment_provider: 'mercadopago',
                payment_id: paymentId,
                created_at: new Date()
            });

            await OrderItemModel.bulkCreate(
                pendingOrder.items.map(item => ({
                    order_id: nuevaOrden.id,
                    product_id: item.id,
                    product_name: item.nombre,
                    quantity: item.cantidad,
                    unit_price: item.precio
                }))
            );

            delete pendingOrders[preferenceId];

            res.json({ result: true, orderId: nuevaOrden.id });

        } catch (error) {
            console.error('Error al confirmar orden:', error);
            res.status(500).json({ error: 'Error al guardar la orden' });
        }
    },

   crearOrdenDesdeWebhook: async (orderData) => {
  try {
    const userId = parseInt(orderData.external_reference);
    const paymentId = orderData.id;
    const preferenceId = orderData.metadata?.preference_id || null;

    const pendingOrder = await PendingOrderModel.getByExternalReference(orderData.external_reference);

    if (!pendingOrder) throw new Error('Orden pendiente no encontrada');

    const items = JSON.parse(pendingOrder.items);

    const nuevaOrden = await OrderModel.create({
      user_id: userId,
      amount: pendingOrder.total,
      status: 'pending',
      payment_provider: 'mercadopago',
      payment_id: paymentId,
      created_at: new Date()
    });

    await OrderItemModel.bulkCreate(
      items.map(item => ({
        order_id: nuevaOrden.id,
        product_id: item.id,
        product_name: item.nombre,
        quantity: item.cantidad,
        unit_price: item.precio
      }))
    );

    if (preferenceId) {
      await PendingOrderModel.delete(preferenceId);
    }

    return nuevaOrden;
  } catch (error) {
    console.error('Error al guardar orden desde webhook:', error);
    throw error;
  }
}

};

module.exports = OrderController;
