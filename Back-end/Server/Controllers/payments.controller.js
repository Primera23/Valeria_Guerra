const { pool } = require('../db');

const tVendido = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT SUM(amount) AS total_vendido FROM orders WHERE status = ?',
      ['approved']
    );

    const totalVendido = rows[0].total_vendido || 0;
    res.json({ totalVendido });
  } catch (error) {
    console.error('Error al obtener el total vendido:', error);
    res.status(500).json({ error: 'Error al obtener el total vendido' });
  }
};


module.exports = {
    tVendido
};