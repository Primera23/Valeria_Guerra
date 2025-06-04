const { pool } = require('../db');


const OrderItemModel = {
    bulkCreate: async (items) => {
        if (items.length === 0) return;
        
        const values = items.map(item => [
            item.order_id,
            item.product_id,
            item.product_name,
            item.quantity,
            item.unit_price
        ]);
        
        await pool.query(
            'INSERT INTO orders_items (order_id, product_id, product_name, quantity, unit_price) VALUES ?',
            [values]
        );
    },

    findByOrderId: async (orderId) => {
        const [rows] = await pool.execute(
            'SELECT * FROM orders_items WHERE order_id = ?',
            [orderId]
        );
        return rows;
    }
};

module.exports = OrderItemModel;