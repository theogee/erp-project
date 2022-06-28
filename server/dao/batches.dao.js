const pool = require("./pool");

module.exports = {
  getBatches: async (params) => {
    try {
      const { materialID } = params;

      console.log(materialID);

      const sql =
        "SELECT * FROM batches WHERE material_id = $1 ORDER BY purchase_date ASC";

      return await pool.query(sql, [materialID]);
    } catch (err) {
      throw err;
    }
  },
  getBatchesByID: async (params) => {
    try {
      const { batchID } = params;

      const sql = "SELECT * FROM batches WHERE batch_id = $1";

      return await pool.query(sql, [batchID]);
    } catch (err) {
      throw err;
    }
  },
  postBatches: async (params) => {
    try {
      const sql =
        "INSERT INTO batches VALUES (default, $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";

      console.log(params);

      return await pool.query(sql, [
        params.materialID,
        params.supplierID,
        params.purchaseQty,
        params.currentQty,
        params.pricePerUnit,
        params.purchasePrice,
        params.purchaseDate,
        params.expiryDate,
      ]);
    } catch (err) {
      throw err;
    }
  },
  updateBatches: async (params) => {
    try {
      const {
        materialID,
        supplierID,
        purchaseQty,
        currentQty,
        pricePerUnit,
        purchasePrice,
        purchaseDate,
        expiryDate,
        batchID,
        userID,
      } = params;

      let sqlParam = [];
      let arrParam = [];
      let i = 1;

      if (supplierID) {
        sqlParam.push(`supplier_id = $${i++}`);
        arrParam.push(supplierID);
      }

      if (purchaseQty) {
        sqlParam.push(`purchase_qty = $${i++}`);
        arrParam.push(purchaseQty);
      }

      if (currentQty || currentQty === 0) {
        sqlParam.push(`current_qty = $${i++}`);
        arrParam.push(currentQty);
      }

      if (pricePerUnit) {
        sqlParam.push(`price_per_unit = $${i++}`);
        arrParam.push(pricePerUnit);
      }

      if (purchasePrice) {
        sqlParam.push(`purchase_price = $${i++}`);
        arrParam.push(purchasePrice);
      }

      if (purchaseDate) {
        sqlParam.push(`purchase_date = $${i++}`);
        arrParam.push(purchaseDate);
      }

      if (expiryDate) {
        sqlParam.push(`expiry_date = $${i++}`);
        arrParam.push(expiryDate);
      }

      const sql = `
      UPDATE batches bt SET
      ${sqlParam.join(", ")}
      FROM material m, business bs
      WHERE bt.batch_id = $${i++} AND bt.material_id = m.material_id AND m.business_id = bs.business_id AND bs.user_id = $${i++}
      RETURNING bt.*`;

      console.log(sql);

      return await pool.query(sql, [...arrParam, batchID, userID]);
    } catch (err) {
      throw err;
    }
  },
  deleteBatches: async (params) => {
    try {
      const { batchID, userID } = params;

      const sql = `
      DELETE FROM batches bt
      USING material m, business bs
      WHERE bt.batch_id = $1 AND bt.material_id = m.material_id AND m.business_id = bs.business_id AND bs.user_id = $2
      RETURNING bt.*`;

      return await pool.query(sql, [batchID, userID]);
    } catch (err) {
      throw err;
    }
  },
  deleteBatchesByMaterialID: async (params) => {
    try {
      const { materialID, userID } = params;

      const sql = `
      DELETE FROM batches bt
      USING material m, business bs
      WHERE bt.material_id = $1 AND bt.material_id = m.material_id AND m.business_id = bs.business_id AND bs.user_id = $2
      RETURNING bt.*`;

      return await pool.query(sql, [materialID, userID]);
    } catch (err) {
      throw err;
    }
  },
};
