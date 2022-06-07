const pool = require("./pool");

module.exports = {
  getSupplier: async (businessID) => {
    const sql = `
    SELECT *
    FROM supplier s
    WHERE business_id = $1`;

    try {
      return await pool.query(sql, [businessID]);
    } catch (err) {
      throw err;
    }
  },
  getSupplierParams: async (params) => {
    const { supplierID } = params;

    const sql = `
    SELECT *
    FROM supplier s
    WHERE s.supplier_id = $1`;

    try {
      return await pool.query(sql, [supplierID]);
    } catch (err) {
      throw err;
    }
  },
  postSupplier: async (params) => {
    const { businessID, name, address, telp } = params;

    const sql = `
    INSERT
    INTO supplier
    VALUES
    (default, $1, $2, $3, $4)
    RETURNING *`;

    try {
      return await pool.query(sql, [businessID, name, address, telp]);
    } catch (err) {
      throw err;
    }
  },
  updateSupplier: async (params) => {
    const { name, address, telp, supplierID, userID } = params;

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

    if (address) {
      sqlParam.push(`address = $${i++}`);
      arrParam.push(address);
    }

    if (telp) {
      sqlParam.push(`telp = $${i++}`);
      arrParam.push(telp);
    }

    const sql = `
    UPDATE supplier s SET
    ${sqlParam.join(", ")}
    FROM business b
    WHERE s.supplier_id = $${i++} AND s.business_id = b.business_id AND b.user_id = $${i++}
    RETURNING s.*`;

    console.log(sql);

    try {
      return await pool.query(sql, [...arrParam, supplierID, userID]);
    } catch (err) {
      throw err;
    }
  },
  deleteSupplier: async (params) => {
    const { userID, supplierID } = params;

    const sql = `
    DELETE FROM supplier s
    USING business b
    WHERE s.business_id = b.business_id AND b.user_id = $1 AND s.supplier_id = $2
    RETURNING s.*`;

    try {
      return await pool.query(sql, [userID, supplierID]);
    } catch (err) {
      throw err;
    }
  },
};
