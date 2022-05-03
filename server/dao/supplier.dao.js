const pool = require("./pool");

module.exports = {
  getSupplier: async () => {
    const sql = `
    SELECT *
    FROM supplier s`;

    try {
        return await pool.query(sql);
      } catch (err) {
        throw err;
      }
  },
  getSupplierWithQuery: async (params) => {

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

    const { supplierID, businessID, name, address, telp } = params;

    const sql = `
    INSERT
    INTO supplier
    (supplier_id, business_id, name, address, telp)
    VALUES
    ($1, $2, $3, $4, $5)`;

    try {
      return await pool.query(sql, [supplierID, businessID, name, address, telp]);
    } catch (err) {
      throw err;
    }
  },
};