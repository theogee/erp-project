const pool = require("./pool");

module.exports = {
	getBusiness: async (userID) => {
    const sql = `
    SELECT *
    FROM business b
    WHERE user_id = $1`;

    try {
			return await pool.query(sql,[userID]);
		} catch (err) {
			throw err;
		}
  },

  deleteBusiness: async (params) => {
    const { userID, businessID } = params;

    const sql = `
    DELETE FROM business b
    USING users u
    WHERE b.user_id = u.user_id AND b.business_id = $1
    RETURNING s.*`;

    try {
      return await pool.query(sql, [businessID, userID]);
    } catch (err) {
      throw err;
    }
  },
};