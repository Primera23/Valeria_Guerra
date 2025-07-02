const { pool } = require('../db');


const countVentas = async () => {
    const [results] = await pool.query('SELECT COUNT(*) AS total FROM orders where status = "approved"');
    return results[0].total;
};

const ventas = async () => {
   const [results] = await pool.query(
      'SELECT SUM(amount) AS total_vendido FROM orders WHERE status = ?',
      ['approved']
    );
     return results[0].total_vendido ;
;
};
module.exports = {
    countVentas,
    ventas
};