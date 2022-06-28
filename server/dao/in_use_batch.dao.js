const pool = require("./pool");

module.exports = {
  getInUseBatchByProductBatchID: async (params) => {
    const { productBatchID } = params;

    const sql = "SELECT * FROM in_use_batch WHERE product_batch_id = $1";

    try {
      return await pool.query(sql, [productBatchID]);
    } catch (err) {
      throw err;
    }
  },
  postInUseBatch: async (params) => {
    const { productBatchID, materialBatchID, qty } = params;

    const sql = "INSERT INTO in_use_batch VALUES ($1, $2, $3)";

    try {
      return await pool.query(sql, [productBatchID, materialBatchID, qty]);
    } catch (err) {
      throw err;
    }
  },
  deleteInUseBatch: async (params) => {
    const { productBatchID } = params;

    const sql = "DELETE FROM in_use_batch where product_batch_id = $1";

    try {
      return await pool.query(sql, [productBatchID]);
    } catch (err) {
      throw err;
    }
  },
};
