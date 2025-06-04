const OrderModel = require('../Models/order.model');
const OrderItemModel = require('../Models/orderItem.model');
const mercadopago = require('../Services/mercadopagoConfig');

// Configurar MercadoPago (esto podría ir en un archivo de configuración)


const OrderController = {
    createOrder: async (req, res) => {
        try {
            const { items, total } = req.body;
            
            // 1. Crear orden en la base de datos
            const nuevaOrden = await OrderModel.create({
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
            const preference = {
                items: items.map(item => ({
                    title: item.nombre,
                    unit_price: item.precio,
                    quantity: item.cantidad,
                    picture_url: item.imagen ? `/uploads/${item.imagen}` : null
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
            
            const response = await mercadopago.preferences.create(preference);
            
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