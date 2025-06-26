const OrderModel = require('../Models/order.model');
const OrderItemModel = require('../Models/orderItem.model');


const mercadopago = require('../Services/mercadopagoConfig');



const OrderController = {
    createOrder: async (req, res) => {
        console.log('Dentro de createOrder - sesión ID:', req.sessionID);
        console.log('Dentro de createOrder - usuario:', req.session.userId);

        try {
            if (!req.session.userId) {
                return res.status(401).json({ result: false, message: 'Inicie sesion' });
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
            const baseUrl =  'https://localhost:3001';

            const preferencePayload = {
                items: items.map(item => {
                    const product = {
                        title: item.nombre,
                        unit_price: Number(item.precio),
                        quantity: item.cantidad,
                        currency_id: 'COP'
                    };

                    if (item.imagen) {
                        product.picture_url = `${baseUrl}/uploads/${item.imagen}`;
                    }

                    return product;
                }),
                external_reference: nuevaOrden.id.toString(),
                back_urls: {
                    success: `${baseUrl}/pago-exitoso`,
                    failure: `${baseUrl}/pago-fallido`,
                    pending: `${baseUrl}/pago-pendiente`
                },
                auto_return: 'approved',
                binary_mode: true,
                notification_url: `https://fc49-179-1-218-200.ngrok-free.app/webhook-mercadopago`
            };

            console.log('Preference payload:', JSON.stringify(preferencePayload, null, 2));
            console.log('Final payload keys:', Object.keys(preferencePayload));
            console.log('First item keys:', Object.keys(preferencePayload.items[0]));

            


           const response = await mercadopago.preferences.create(preferencePayload);

            console.log('Orden creada con éxito');
console.log('Preference ID:', response.id);
console.log('ID orden DB:', nuevaOrden.id); 

            res.json({
                result: true,
                message: 'Orden creada con éxito',
                preferenceId: response.id,
                orderId: nuevaOrden.id
            });

        } catch (error) {
            console.error('Error al crear orden:', error);
            res.status(500).json({ error: 'Error al crear la orden' });
        }
    }

    
};

module.exports = OrderController;