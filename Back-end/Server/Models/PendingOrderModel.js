const { pool } = require('../db');

const PendingOrderModel = {
  create: async ({ user_id, preference_id, external_reference, total, items, created_at }) => {
  const [result] = await pool.execute(
    `INSERT INTO pending_orders (user_id, preference_id, external_reference, total, items, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [user_id, preference_id, external_reference, total, items, created_at]
  );
  return result;
},
 
  deleteByExternalReference: async (externalReference) => {
  if (!externalReference) throw new Error('Se requiere externalReference');
  await pool.execute(
    'DELETE FROM pending_orders WHERE external_reference = ?',
    [externalReference]
  );
},

 getByPreferenceId: async (preferenceId) => {
  if (!preferenceId) {
    throw new Error('preferenceId requerido en getByPreferenceId');
  }

  const [rows] = await pool.execute(
    'SELECT * FROM pending_orders WHERE preference_id = ?',
    [preferenceId]
  );
  return rows[0];
},

  delete: async (preference_id) => {
    await pool.execute(
      'DELETE FROM pending_orders WHERE preference_id = ?',
      [preference_id]
    );
  },

  getByExternalReference: async (externalReference) => {
  if (!externalReference) throw new Error('externalReference requerido');
  const [rows] = await pool.execute(
    'SELECT * FROM pending_orders WHERE external_reference = ?',
    [externalReference]
  );
  return rows[0];
}
};

module.exports = PendingOrderModel;
