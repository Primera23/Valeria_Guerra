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
        const baseUrl = 'https://5aa4-2800-484-df78-8c00-24b3-3404-9008-ed06.ngrok-free.app';
        const externalReference = `user-${userId}-${Date.now()}`;

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
           external_reference: externalReference,
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
        external_reference: `user-${userId}-${Date.now()}`,
        total,
        items: JSON.stringify(items)
        });
        // Guardar orden pendiente
        await PendingOrderModel.create({
        user_id: userId,
        preference_id: preference.id,
        external_reference: externalReference,  // <--- clave para enlazar desde el webhook
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

    

   crearOrdenDesdeWebhook: async (orderData) => {
  try {
    console.log('📦 Webhook -> orderData:', orderData);
    console.log('🔎 preference_id:', orderData.preference_id);
    console.log('🔎 external_reference:', orderData.external_reference);

    const userId = parseInt(orderData.external_reference.split('-')[1]); 
    const paymentId = orderData.id;
    
    // Buscar la orden pendiente por external_reference
    const pendingOrder = await PendingOrderModel.getByExternalReference(orderData.external_reference);
    
    if (!pendingOrder) {
      throw new Error(`Orden pendiente no encontrada para external_reference: ${orderData.external_reference}`);
    }

    const items = JSON.parse(pendingOrder.items);
    
    // Verificar que el total coincida
    if (parseFloat(pendingOrder.total) !== parseFloat(orderData.transaction_amount)) {
      console.warn(`⚠️ Advertencia: El total de la orden pendiente (${pendingOrder.total}) no coincide con el de la transacción (${orderData.transaction_amount})`);
    }

    let estadoOrden;

if (orderData.status === 'approved') {
  estadoOrden = 'approved';
} else if (orderData.status === 'in_process' || orderData.status === 'pending') {
  estadoOrden = 'pending';
} else {
  estadoOrden = 'rejected';
}

const nuevaOrden = await OrderModel.create({
  user_id: userId,
  amount: pendingOrder.total,
  status: estadoOrden,
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

    // Eliminar la orden pendiente usando el preference_id si existe
    if (pendingOrder.preference_id) {
      await PendingOrderModel.delete(pendingOrder.preference_id);
    }

    return nuevaOrden;
  } catch (error) {
    console.error('Error al guardar orden desde webhook:', error);
    throw error;
  }
}

};

module.exports = OrderController;
