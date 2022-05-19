const pool = require("./pool");

module.exports = {
	getProduct: async (productID) => {
    const sql = `
    SELECT *
    FROM product p
    WHERE business_id = $1`;

    try {
			return await pool.query(sql,[productID]);
		} catch (err) {
			throw err;
		}
  },
  getProductParams: async (params) => {
    try {
      const { productID, businessID } = params;

      const sql = "SELECT * FROM product WHERE product_id = $1 AND business_id = $2";

      return await pool.query(sql, [productID, businessID]);
    } catch (err) {
      throw err;
    }
  },

  deleteProduct: async (params) => {
    const { productID, businessID } = params;

    const sql = `
    DELETE FROM product p
    WHERE product_id = $1 AND business_id = $2
    RETURNING p.*`;

    try {
      return await pool.query(sql, [productID, businessID]);
    } catch (err) {
      throw err;
    }
  },

  postProduct: async (params) => {
    const { productID, businessID, name, price } = params;

    const sql = `
    INSERT
    INTO product
    VALUES
    (default, $1, $2, $3)
    RETURNING *`;

    try {
      return await pool.query(sql, [businessID, name, price]);
    } catch (err) {
      throw err;
    }
  },
  
  updateProduct: async (params) => {
    const { name, price, productID, businessID } = params;

    let i = 1;

    // const sql = `
    // UPDATE supplier SET name = ${name ? "$" + i++ : "name"},
    // address = ${address ? "$" + i++ : "addresss"},
    // telp = ${telp ? "$" + i++ : "telp"}
    // WHERE supplier_id = ${i++} AND business_id = ${i++}`;

    // const sql = `
    // UPDATE supplier SET
    // ${ name ? "name = $1" : "" }
    // ${ name ? "," : "" }
    // ${ address ? "address = $2" : "" }
    // ${ address ? "," : "" }
    // ${ telp ? "telp = $3" : "" }
    // WHERE supplier_id = $4 AND business_id = $5
    // `

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
    WHERE product_id = $${i++} AND business_id = $${i++}
    RETURNING p.*`;

    console.log(sql);

    try {
      return await pool.query(sql, [...arrParam, productID,businessID]);
    } catch (err) {
      throw err;
    }
  },
};
