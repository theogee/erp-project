const pool = require("./pool");

module.exports = {
  getProduct: async (productID) => {
    const sql = `
    SELECT *
    FROM product p
    WHERE business_id = $1`;

    try {
      return await pool.query(sql, [productID]);
    } catch (err) {
      throw err;
    }
  },
  getProductParams: async (params) => {
    try {
      const { productID } = params;

      const sql = "SELECT * FROM product WHERE product_id = $1";

      return await pool.query(sql, [productID]);
    } catch (err) {
      throw err;
    }
  },

  deleteProduct: async (params) => {
    const { productID, userID } = params;

    const sql = `
    DELETE FROM product p
    USING business b
    WHERE p.product_id = $1 AND p.business_id = b.business_id AND b.user_id = $2
    RETURNING p.*`;

    try {
      return await pool.query(sql, [productID, userID]);
    } catch (err) {
      throw err;
    }
  },

  postProduct: async (params) => {
    const { businessID, name, price, productionProcess } = params;

    const sql = `
    INSERT
    INTO product
    VALUES
    (default, $1, $2, $3, $4)
    RETURNING *`;

    try {
      return await pool.query(sql, [
        businessID,
        name,
        price,
        productionProcess,
      ]);
    } catch (err) {
      throw err;
    }
  },

  updateProduct: async (params) => {
    const { name, price, productID, userID } = params;

    let i = 1;

    let sqlParam = [];
    let arrParam = [];

    if (name) {
      sqlParam.push(`name = $${i++}`);
      arrParam.push(name);
    }

    if (price) {
      sqlParam.push(`price = $${i++}`);
      arrParam.push(price);
    }

    const sql = `
    UPDATE product p SET
    ${sqlParam.join(", ")}
    FROM business b
    WHERE p.product_id = $${i++} AND p.business_id = b.business_id AND b.user_id = $${i++}
    RETURNING p.*`;

    console.log(sql);

    try {
      return await pool.query(sql, [...arrParam, productID, userID]);
    } catch (err) {
      throw err;
    }
  },
};
