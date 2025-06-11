const OrderModel = require('../Models/order.model');
const OrderItemModel = require('../Models/orderItem.model');
const preference = require('../Services/mercadopagoConfig');

// Configurar MercadoPago (esto podría ir en un archivo de configuración)


const OrderController = {
    createOrder: async (req, res) => {
        try {
        if (!req.session.userId) {
            return res.status(401).json({ result:false, message:'Inicie sesion' });
        }
        
        const { items, total } = req.body;
        if (!items || !total) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }
            
            // 1. Crear orden en la base de datos
            const nuevaOrden = await OrderModel.create({
                user_id: req.session.userId,
                amount: total,
                status: 'pending',
                payment_provider: 'mercadopago',
                created_at: new Date()
            });
            
            // 2. Crear items de la orden
            const orderItems = items.map(item => ({
                order_id: nuevaOrden.id,
                product_id: item.id,
                product_name: item.nombre,
                quantity: item.cantidad,
                unit_price: item.precio
            }));
            
            await OrderItemModel.bulkCreate(orderItems);
            
            // 3. Crear preferencia en MercadoPago
           const baseUrl = process.env.BASE_URL || 'http://localhost:3000';  // fallback por si no está definida

            const preferencePayload = {
  items: items.map(item => ({
    title: item.nombre,
    unit_price: Number(item.precio),   // asegurarse que sea número
    quantity: item.cantidad,
    picture_url: item.imagen ? `https://18a5-2800-484-df78-8c00-d5e5-595f-dac3-7e00.ngrok-free.app/uploads/${item.imagen}` : null,
    currency_id: 'COP'  // <-- agregar la moneda correcta
  })),
  external_reference: nuevaOrden.id.toString(),
  back_urls: {
    success: `${process.env.BASE_URL}/pago-exitoso`,
    failure: `${process.env.BASE_URL}/pago-fallido`,
    pending: `${process.env.BASE_URL}/pago-pendiente`
  },
  auto_return: 'approved',
  binary_mode: true
};
            console.log('Preference payload:', JSON.stringify(preferencePayload, null, 2));
            const response = await preference.create(preferencePayload);
            
            res.json({
                preferenceId: response.body.id,
                orderId: nuevaOrden.id
            });
            
        } catch (error) {
            console.error('Error al crear orden:', error);
            res.status(500).json({ error: 'Error al crear la orden' });
        }
    },

    updateOrderStatus: async (req, res) => {
        try {
            const { orderId } = req.params;
            const { status } = req.body;
            
            await OrderModel.update(orderId, { status });
            res.json({ message: 'Estado actualizado correctamente' });
            
        } catch (error) {
            console.error('Error al actualizar orden:', error);
            res.status(500).json({ error: 'Error al actualizar la orden' });
        }
    }
};

module.exports = OrderController;