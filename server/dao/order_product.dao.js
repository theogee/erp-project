const pool = require("./pool");

module.exports = {
	getProductMaterial: async (params) => {
    const { productID, orderID } = params;

    const sql = `
    SELECT *
    FROM order_product
    WHERE product_id = $1 AND order_id = $2`;

    try {
			return await pool.query(sql,[productID, orderID]);
		} catch (err) {
			throw err;
		}
  },
  postProductMaterial: async (params) => {
    const { productID, orderID, qty } = params;

    const sql = `
    INSERT
    INTO order_product
    VALUES
    ($1, $2, $3)
    RETURNING *`;

    try {
      return await pool.query(sql, [orderID, productID, qty]);
    } catch (err) {
      throw err;
    }
  },
  updateSupplier: async (params) => {
    const { productID, orderID, qty } = params;

    let i = 1;

    let sqlParam = [];
    let arrParam = [];

    if (qty) {
      sqlParam.push(`qty = $${i++}`);
      arrParam.push(qty);
    }

    const sql = `
    UPDATE order_product SET
    ${sqlParam.join(", ")}
    WHERE order_id = $${i++} AND product_id = $${i++}
    RETURNING *`;

    console.log(sql);

    try {
      return await pool.query(sql, [...arrParam]); // Gue ga tau sih kira2 apa aja yang bisa diedit
    } catch (err) {
      throw err;
    }
  },
  deleteSupplier: async (params) => {
    const { productID, orderID } = params;

    const sql = `
    DELETE FROM order_product
    WHERE product_id = $1 AND order_id = $2
    RETURNING *`;

    try {
      return await pool.query(sql, [productID, orderID]);
    } catch (err) {
      throw err;
    }
  },
};
