const { pool } = require('../db');

const OrderModel = {
    create: async (orderData) => {
        try {
            console.log('Pool disponible:', !!pool); // Debe ser true
            const [result] = await pool.query(
                'INSERT INTO orders (user_id, amount, status, payment_provider, payment_id, created_at) VALUES (?, ?, ?, ?, ?, ?)',
                [
                    orderData.user_id,
                    orderData.amount,
                    orderData.status,
                    orderData.payment_provider,
                    orderData.payment_id,
                    orderData.created_at
                ]
            );
            return { id: result.insertId, ...orderData };
        } catch (error) {
            console.error('Error en OrderModel.create:', error);
            throw error;
        }
    },

    updateByPaymentId: async (paymentId, updateData) => {
        if (!paymentId) throw new Error('payment_id requerido');

        const status = updateData.status ?? null;
        const receiptUrl = updateData.payment_receipt_url ?? null;

        console.log('UPDATE con payment_id:', [status, receiptUrl, paymentId]);

        await pool.execute(
            'UPDATE orders SET status = ?, payment_receipt_url = ? WHERE payment_id = ?',
            [status, receiptUrl, paymentId]
        );
    },
    getByPaymentId: async (paymentId) => {
    const [rows] = await pool.execute(
      'SELECT * FROM orders WHERE payment_id = ?',
      [paymentId]
    );
    return rows[0];
  },

    findById: async (id) => {
        const [rows] = await pool.execute('SELECT * FROM orders WHERE id = ?', [id]);
        return rows[0];
    },

    findByPaymentId: async (paymentId) => {
        const [rows] = await pool.execute('SELECT * FROM orders WHERE payment_id = ?', [paymentId]);
        return rows[0] || null;
    }
};

module.exports = OrderModel;
