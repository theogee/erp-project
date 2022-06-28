const pool = require("./pool");

module.exports = {
  getAllMaterialOfProductID: async (params) => {
    const { productID } = params;

    const sql = `
    SELECT pm.*, ma.name, me.name as measurement_name
    FROM product_material pm, material ma, measurement me
    WHERE pm.material_id = ma.material_id AND me.measurement_id = ma.measurement_id AND product_id = $1`;

    try {
      return await pool.query(sql, [productID]);
    } catch (err) {
      throw err;
    }
  },
  postAllMaterialOfProductID: async (params) => {
    const { materials } = params;

    const values = materials.map(
      (m) => `(${m.productID}, ${m.materialID}, ${m.measurementID}, ${m.qty})`
    );

    const sql = `INSERT INTO product_material VALUES ${values.join(",")}`;

    console.log(sql);

    try {
      return await pool.query(sql);
    } catch (err) {
      throw err;
    }
  },
  async putAllMaterialOfProductID(params) {
    try {
      const { materials } = params;

      // delete all existing material
      await this.deleteAllMaterialOfProductID({
        productID: materials[0].productID,
      });

      // insert the new material list
      await this.postAllMaterialOfProductID({ materials: materials });

      return;
    } catch (err) {
      throw err;
    }
  },
  deleteAllMaterialOfProductID: async (params) => {
    try {
      const { productID } = params;

      const sql = "DELETE FROM product_material WHERE product_id = $1";

      await pool.query(sql, [productID]);
    } catch (err) {
      throw err;
    }
  },
};
