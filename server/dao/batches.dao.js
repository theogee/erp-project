const pool = require("./pool");

module.exports = {
  getBatches: async (params) => {
    try {
      const { materialID } = params;

      console.log(materialID);

      const sql = "SELECT * FROM batches WHERE material_id = $1";

      return await pool.query(sql, [materialID]);
    } catch (err) {
      throw err;
    }
  },
};
