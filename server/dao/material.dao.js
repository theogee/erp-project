const pool = require("./pool");

module.exports = {
  getMaterial: async (businessID) => {
    const sql = `
    SELECT mt.*, ms.name AS measurement_name, SUM(b.current_qty) AS cummulative_qty 
    FROM material mt, measurement ms, batches b 
    WHERE mt.measurement_id = ms.measurement_id AND mt.material_id = b.material_id AND mt.business_id = $1
    GROUP BY mt.material_id, ms.name`;

    try {
      return await pool.query(sql, [businessID]);
    } catch (err) {
      throw err;
    }
  },
  getMaterialParams: async (params) => {
    const { materialID } = params;

    const sql = `
    SELECT mt.*, ms.name AS measurement_name, SUM(b.current_qty) AS cummulative_qty 
    FROM material mt, measurement ms, batches b
    WHERE mt.measurement_id = ms.measurement_id AND mt.material_id = b.material_id AND mt.material_id = $1
	  GROUP BY mt.material_id, ms.name`;

    try {
      return await pool.query(sql, [materialID]);
    } catch (err) {
      throw err;
    }
  },
  postMaterial: async (params) => {
    const { businessID, measurementID, safetyStockQty, name } = params;

    const sql = `
    INSERT
    INTO material
    (material_id, business_id, measurement_id, safety_stock_qty, name)
    VALUES
    (default, $1, $2, $3, $4)
    RETURNING *`;

    try {
      return await pool.query(sql, [
        businessID,
        measurementID,
        safetyStockQty,
        name,
      ]);
    } catch (err) {
      throw err;
    }
  },
  updateMaterial: async (params) => {
    const { materialID, measurementID, safetyStockQty, name, userID } = params;

    let sqlParam = [];
    let arrParam = [];
    let i = 1;

    if (measurementID) {
      sqlParam.push(`measurement_id = $${i++}`);
      arrParam.push(measurementID);
    }

    if (safetyStockQty !== 0) {
      sqlParam.push(`safety_stock_qty = $${i++}`);
      arrParam.push(safetyStockQty);
    }

    if (name) {
      sqlParam.push(`name = $${i++}`);
      arrParam.push(name);
    }

    const sql = `
    UPDATE material m
    SET ${sqlParam.join(", ")}
    FROM business b
    WHERE m.material_id = $${i++} AND m.business_id = b.business_id AND b.user_id = $${i++}
    RETURNING m.*`;

    try {
      return await pool.query(sql, [...arrParam, materialID, userID]);
    } catch (err) {
      throw err;
    }
  },
  deleteMaterial: async (params) => {
    const { materialID, userID } = params;

    const sql = `
    DELETE FROM material m
    USING business b
    WHERE m.material_id = $1 AND m.business_id = b.business_id AND b.user_id = $2
    RETURNING m.*`;

    try {
      return await pool.query(sql, [materialID, userID]);
    } catch (err) {
      throw err;
    }
  },
};
