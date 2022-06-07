const pool = require("./pool");

module.exports = {
  getMeasurement: async (params) => {
    try {
      const sql = "SELECT * FROM measurement";

      return await pool.query(sql);
    } catch (err) {
      throw err;
    }
  },
};
