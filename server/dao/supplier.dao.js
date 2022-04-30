const pool = require("./pool");

module.exports = {
  updateSupplier: async (params) => {
    const { name, address, telp, businessID, supplierID } = params;

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
    UPDATE supplier SET
    ${sqlParam.join(", ")}
    WHERE supplier_id = $${i++} AND business_id = $${i++}
    `;

    console.log(sql);

    try {
      return await pool.query(sql, [...arrParam, supplierID, businessID]);
    } catch (err) {
      throw err;
    }
  },
};
