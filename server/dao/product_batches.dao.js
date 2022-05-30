const pool = require("./pool");

module.exports = {
  getProductBatches: async (productID) => {
    const sql = `
    SELECT *
    FROM product_batches pb
    WHERE product_id = $1`;

    try {
      return await pool.query(sql, [productID]);
    } catch (err) {
      throw err;
    }
  },
  getProductBatchesParams: async (params) => {
    try {
      const { productBatchID } = params;

      const sql = "SELECT * FROM product_batches WHERE product_batch_id = $1";

      return await pool.query(sql, [productBatchID]);
    } catch (err) {
      throw err;
    }
  },

  deleteProductBatch: async (params) => {
    const { productBatchID, businessID } = params;

    const sql = `
    DELETE FROM product_batches pb
    USING product p
    WHERE pb.product_batch_id = $1 AND pb.product_id = p.product_id AND p.business_id = $2
    RETURNING pb.*`;

    try {
      return await pool.query(sql, [productBatchID, businessID]);
    } catch (err) {
      throw err;
    }
  },

  postProductBatch: async (params) => {
    const { productID, productionDate, expiryDate, quantity } = params;

    const sql = `
    INSERT
    INTO product_batches
    VALUES
    (default, $1, $2, $3, $4)
    RETURNING *`;

    try {
      return await pool.query(sql, [
        productID,
        productionDate,
        expiryDate,
        quantity,
      ]);
    } catch (err) {
      throw err;
    }
  },

  updateProductBatch: async (params) => {
    const { productionDate, expiryDate, quantity, productBatchID, businessID } =
      params;

    let i = 1;

    let sqlParam = [];
    let arrParam = [];

    if (productionDate) {
      sqlParam.push(`production_date = $${i++}`);
      arrParam.push(productionDate);
    }

    if (expiryDate) {
      sqlParam.push(`expiry_date = $${i++}`);
      arrParam.push(expiryDate);
    }

    if (quantity) {
      sqlParam.push(`qty = $${i++}`);
      arrParam.push(quantity);
    }

    const sql = `
    UPDATE product_batches pb SET
    ${sqlParam.join(", ")}
    FROM product p
    WHERE pb.product_batch_id = $${i++} AND pb.product_id = p.product_id AND p.business_id = $${i++}
    RETURNING pb.*`;

    console.log(sql);

    try {
      return await pool.query(sql, [...arrParam, productBatchID, businessID]);
    } catch (err) {
      throw err;
    }
  },
};
