const pool = require("./pool");

module.exports = {
  getProductMaterial: async (params) => {
    const { productID } = params;

    const sql = `
    SELECT pm.*, ma.name, me.id as measurement_id, me.name as measurement_name
    FROM product_material pm, material ma, measurement me
    WHERE pm.material_id = ma.material_id AND me.measurement_id = ma.measurement_id AND product_id = $1`;

    try {
      return await pool.query(sql, [productID]);
    } catch (err) {
      throw err;
    }
  } /*
  postProductMaterial: async (params) => {
    const { productID, materialID, measurementID, qty } = params;

    const sql = `
    INSERT
    INTO product_material
    VALUES
    ($1, $2, $3, $4)
    RETURNING *`;

    try {
      return await pool.query(sql, [productID, materialID, measurementID, qty]);
    } catch (err) {
      throw err;
    }
  },
  updateSupplier: async (params) => {
    const { productID, materialID, measurementID, qty } = params;

    let i = 1;

    let sqlParam = [];
    let arrParam = [];

    if (measurementID) {
      sqlParam.push(`measurement_id = $${i++}`);
      arrParam.push(measurementID);
    }

    if (qty) {
      sqlParam.push(`qty = $${i++}`);
      arrParam.push(qty);
    }

    const sql = `
    UPDATE product_material SET
    ${sqlParam.join(", ")}
    WHERE product_id = $${i++} AND material_id = $${i++}
    RETURNING *`;

    console.log(sql);

    try {
      return await pool.query(sql, [...arrParam, productID, materialID]); // Gue ga tau sih kira2 apa aja yang bisa diedit
    } catch (err) {
      throw err;
    }
  },
  deleteSupplier: async (params) => {
    const { productID, materialID } = params;

    const sql = `
    DELETE FROM product_material
    WHERE product_id = $1 AND material_id = $2
    RETURNING *`;

    try {
      return await pool.query(sql, [productID, materialID]);
    } catch (err) {
      throw err;
    }
  },*/,
};
