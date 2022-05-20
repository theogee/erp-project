const pool = require("./pool");

module.exports = {
  getBusiness: async (userID) => {
    const sql = `
    SELECT *
    FROM business b
    WHERE user_id = $1`;

    try {
      return await pool.query(sql, [userID]);
    } catch (err) {
      throw err;
    }
  },

  deleteBusiness: async (params) => {
    const { userID, businessID } = params;

    const sql = `
    DELETE FROM business
    WHERE user_id = $1 AND business_id = $2
    RETURNING *`;

    try {
      return await pool.query(sql, [userID, businessID]);
    } catch (err) {
      throw err;
    }
  },

  postBusiness: async (params) => {
    const { userID, name, address } = params;

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
    UPDATE business SET
    ${sqlParam.join(", ")}
    WHERE business_id = $${i++} AND user_id = $${i++}
    RETURNING *`;

    console.log(sql);

    try {
      return await pool.query(sql, [...arrParam, businessID, userID]);
    } catch (err) {
      throw err;
    }
  },
};
