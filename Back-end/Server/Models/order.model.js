const { pool } = require('../db');


const OrderModel = {
    create: async (orderData) => {
        const [result] = await pool.execute(
            'INSERT INTO orders (user_id,amount, status, payment_provider, created_at) VALUES (?, ?, ?, ?, ?)',
            [orderData.user_id,orderData.amount, orderData.status, orderData.payment_provider, orderData.created_at]
        );
        return { id: result.insertId, ...orderData };
    },

    update: async (id, updateData) => {
        await pool.execute(
            'UPDATE orders SET status = ?, payment_id = ?, payment_recapt_url = ? WHERE id = ?',
            [updateData.status, updateData.payment_id, updateData.payment_recapt_url, id]
        );
    },

    findById: async (id) => {
        const [rows] = await pool.execute('SELECT * FROM orders WHERE id = ?', [id]);
        return rows[0];
    }
};

module.exports = OrderModel;