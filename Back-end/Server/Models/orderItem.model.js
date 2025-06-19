const { pool } = require('../db');


const OrderItemModel = {
    bulkCreate: async (items) => {
        if (items.length === 0) return;

        const placeholders = items.map(() => '(?, ?, ?, ?, ?)').join(', ');
        const values = items.flatMap(item => [
            item.order_id,
            item.product_id,
            item.product_name,
            item.quantity,
            item.unit_price
        ]);

        const sql = `INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price) VALUES ${placeholders}`;

        await pool.query(sql, values);
    },

    findByOrderId: async (orderId) => {
        const [rows] = await pool.execute(
            'SELECT * FROM order_items WHERE order_id = ?',
            [orderId]
        );
        return rows;
    }
};

module.exports = OrderItemModel;