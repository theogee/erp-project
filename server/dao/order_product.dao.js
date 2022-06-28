const pool = require("./pool");

module.exports = {
  getProductMaterial: async (params) => {
    const { productID, orderID } = params;

    const sql = `
    SELECT *
    FROM order_product
    WHERE product_id = $1 AND order_id = $2`;

    try {
      return await pool.query(sql, [productID, orderID]);
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
  getAllProductByOrderID: async (params) => {
    const { orderID } = params;

    const sql = `
    SELECT op.*, op.qty * op.product_price as total
    FROM order_product op
    WHERE op.order_id = $1`;

    try {
      return await pool.query(sql, [orderID]);
    } catch (err) {
      throw err;
    }
  },
  postAllProductByOrderID: async (params) => {
    try {
      const { orderID, orderItems } = params;

      console.log(orderItems);

      const values = orderItems.map(
        (item) =>
          `(default, ${orderID}, '${item.productName}', ${item.productPrice}, ${item.qty})`
      );

      const sql = `
      INSERT INTO order_product
      VALUES
      ${values.join(",")}`;

      console.log(sql);

      return await pool.query(sql);
    } catch (err) {
      throw err;
    }
  },
  updateProductByOrderID: async (params) => {
    try {
      const { orderID, orderItem } = params;

      const sql =
        "UPDATE order_product SET qty = $1 WHERE order_id = $2 AND product_id = $3";

      return await pool.query(sql, [
        orderItem.qty,
        orderID,
        orderItem.productID,
      ]);
    } catch (err) {
      throw err;
    }
  },
  deleteProductByOrderID: async (params) => {
    try {
      const { orderID } = params;

      const sql = "DELETE FROM order_product WHERE order_id = $1";

      return await pool.query(sql, [orderID]);
    } catch (err) {
      throw err;
    }
  },
};
