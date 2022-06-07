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

      return await pool.query(sql, [orderID]);
    } catch (err) {
      throw err;
    }
  },
  postOrder: async (params) => {
    try {
      const { businessID, orderDate } = params;

      const sql =
        'INSERT INTO "order" VALUES (default, $1, $2) RETURNING order_id';

      return await pool.query(sql, [businessID, orderDate]);
    } catch (err) {
      throw err;
    }
  },
  updateOrder: async (params) => {
    try {
      const { orderID, orderDate } = params;

      const sql = 'UPDATE "order" SET order_date = $1 WHERE order_id = $2';

      return await pool.query(sql, [orderDate, orderID]);
    } catch (err) {
      throw err;
    }
  },
  deleteOrder: async (params) => {
    try {
      const { orderID } = params;

      const sql = 'DELETE FROM "order" WHERE order_id = $1 RETURNING order_id';

      return await pool.query(sql, [orderID]);
    } catch (err) {
      throw err;
    }
  },
};
