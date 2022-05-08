const pool = require("./pool");

module.exports = {
  getMaterial: async (businessID) => {
    const sql = `
    SELECT *
    FROM material
    WHERE business_id = $1`;

    try {
      return await pool.query(sql, [businessID]);
    } catch (err) {
      throw err;
    }
  },
  getMaterialParams: async (params) => {
    const { materialID } = params;

    const sql = `
    SELECT *
    FROM material
    WHERE material_id = $1`;

    try {
      return await pool.query(sql, [materialID]);
    } catch (err) {
      throw err;
    }
  },
  postMaterial: async (params) => {
    const { businessID, measurementID, safetyStockQty } = params;

    const sql = `
    INSERT
    INTO material
    (material_id, business_id, measurement_id, safety_stock_qty)
    VALUES
    (default, $1, $2, $3)
    RETURNING *`;

    try {
      return await pool.query(sql, [
        businessID,
        measurementID,
        safetyStockQty,
      ]);
    } catch (err) {
      throw err;
    }
  },
  updateMaterial: async (params) => {
    const { materialID, businessID, measurementID, safetyStockQty } = params;
    let sqlParam = [];
    let arrParam = [];
    let i = 1;

    if (measurementID) {
      sqlParam.push(`measurement_id = $${i++}`);
      arrParam.push(measurementID);
    }

    if (safetyStockQty) {
      sqlParam.push(`safety_stock_qty = $${i++}`);
      arrParam.push(safetyStockQty);
    }

    const sql = `
    UPDATE material m
    SET ${sqlParam.join(", ")}
    WHERE material_id = $${i++} AND business_id = $${i++}
    RETURNING m.*`;

    try {
      return await pool.query(sql, [...arrParam, materialID, businessID]);
    } catch (err) {
      throw err;
    }
  },
  deleteMaterial: async (params) => {
    const { materialID, businessID } = params;

    const sql = `
    DELETE FROM material m
    WHERE business_id = $1 AND material_id = $2
    RETURNING m.*`;

    try {
      return await pool.query(sql, [businessID, materialID]);
    } catch (err) {
      throw err;
    }
  }
};
