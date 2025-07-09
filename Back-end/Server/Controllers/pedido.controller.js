const { pool } = require('../db'); // 👈 Importa correctamente el pool desde el objeto

const getPedidosDelUsuarioActual = async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  const sql = `
    SELECT 
      o.id AS order_id,
      o.amount,
      o.status,
      o.created_at,
      i.product_name,
      i.quantity,
      i.unit_price
    FROM orders o
    INNER JOIN order_items i ON o.id = i.order_id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `;

  try {
    const [result] = await pool.query(sql, [userId]); // 👈 ahora sí funciona
    res.json(result);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
};

const getPedidosParaAdmin = async (req, res) => {
  const sql = `
    SELECT 
      o.id AS order_id,
      CONCAT(u2.nombre, ' ', u2.apellido) AS nombre_completo,
      u.correo_electronico AS correo_usuario,
      o.created_at AS fecha_pedido,
      o.status AS estado,
      o.payment_id,
      o.amount AS total_pagado,
      GROUP_CONCAT(CONCAT(i.product_name, ' (x', i.quantity, ')') SEPARATOR ', ') AS productos
    FROM orders o
    INNER JOIN user u ON o.user_id = u.id
    INNER JOIN usuario u2 ON u.id = u2.user_id
    INNER JOIN order_items i ON o.id = i.order_id
    GROUP BY o.id
    ORDER BY o.created_at DESC
  `;

  try {
    const [result] = await pool.query(sql);
    res.json(result);
  } catch (error) {
    console.error('Error al obtener pedidos para admin:', error);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
};


module.exports = { getPedidosDelUsuarioActual, getPedidosParaAdmin };
