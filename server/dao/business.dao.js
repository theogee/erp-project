const pool = require("./pool");

module.exports = {
  postBusiness: async (params) => {
    const { businessID, userID, name, address } = params;

    const sql = `
    INSERT
    INTO business
    VALUES
    (default, $1, $2, $3)
    RETURNING *`;

    try {
      return await pool.query(sql, [userID, name, address]);
    } catch (err) {
      throw err;
    }
  },
  updateBusiness: async (params) => {
    const { name, address, businessID, userID } = params;

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

    const sql = `
    UPDATE business b SET
    ${sqlParam.join(", ")}
    FROM users u
    WHERE b.business_id = $${i++} AND b.user_id = u.user_id AND b.user_id = $${i++}
    RETURNING s.*`;

    console.log(sql);

    try {
      return await pool.query(sql, [...arrParam, businessID, userID]);
    } catch (err) {
      throw err;
    }
  },
};
