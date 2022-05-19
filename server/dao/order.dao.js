const pool = require("./pool");

module.exports = {
  getOrder: async (params) => {
    try {
      const { businessID } = params;

      const sql = 'SELECT * FROM "order" WHERE business_id = $1';

      return await pool.query(sql, [businessID]);
    } catch (err) {
      throw err;
    }
  },
  getOrderByID: async (params) => {
    try {
      const { orderID } = params;

      const sql = 'SELECT * FROM "order" WHERE order_id = $1';

      return await pool.query(sql, [batchID]);
    } catch (err) {
      throw err;
    }
  },
};
