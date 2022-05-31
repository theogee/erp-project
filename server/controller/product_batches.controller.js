const dao = require("../dao/product_batches.dao");
const t = require("../template/response.template");

module.exports = {
  getProductBatches: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getProductBatches(
        req.params.productID
      );

      if (rowCount === 0) return t.res404("Resource not found", res);

      t.res200payload(rows, res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  getProductBatchesByBusinessID: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getProductBatchesByBusinessID(req.query);

      if (rowCount === 0) return t.res404("Resource not found", res);

      t.res200payload(rows, res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  getProductBatchesByProductBatchID: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getProductBatchesByProductBatchID(req.params.productBatchID);

      if (rowCount === 0) return t.res404("Resource not found", res);

      t.res200payload(rows[0], res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  postProductBatch: async (req, res) => {
    try {
      const { rows } = await dao.postProductBatch(req.body);

      t.res201payload(rows[0], res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  updateProductBatch: async (req, res) => {
    try {
      const params = {
        ...req.body,
        productBatchID: req.params.productBatchID,
        userID: req.user.user_id,
      };

      const { rowCount, rows } = await dao.updateProductBatch(params);

      if (rowCount === 0) return t.res404("Resource not found", res);

      t.res200payload(rows[0], res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  deleteProductBatch: async (req, res) => {
    try {
      const params = {
        productID: req.params.productBatchID,
        userID: req.user.user_id,
      };

      const { rowCount, rows } = await dao.deleteProductBatch(params);

      if (rowCount === 0) return t.res404("Resource not found", res);

      t.res200payload(rows[0], res);
    } catch (err) {
      t.res500(err, res);
    }
  },
};
