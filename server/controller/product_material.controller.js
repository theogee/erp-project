const dao = require("../dao/product_material.dao");
const t = require("../template/response.template");

module.exports = {
  getAllMaterialOfProductID: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getAllMaterialOfProductID(req.query);

      if (rowCount === 0) return t.res404("Resource not found", res);

      t.res200payload(rows, res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  postAllMaterialOfProductID: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.postAllMaterialOfProductID(req.body);

      if (rowCount === 0) return t.res404("Batch cannot be created", res);
      t.res201msg("materials successfully added", res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  putAllMaterialOfProductID: async (req, res) => {
    try {
      await dao.putAllMaterialOfProductID(req.body);
      t.res201msg("materials successfully updated.", res);
    } catch (err) {
      t.res500(err, res);
    }
  },
};
