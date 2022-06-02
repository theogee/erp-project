const dao = require("../dao/batches.dao");
const t = require("../template/response.template");

// omit checking for params availability & format - for now

module.exports = {
  getBatches: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getBatches(req.query);

      if (rowCount === 0) return t.res404("Batches cannot be retrieved", res);

      t.res200payload(rows, res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  getBatchesByID: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getBatchesByID({
        batchID: req.params.batchID,
      });

      if (rowCount === 0) return t.res404("Batch cannot be retrieved", res);

      t.res200payload(rows[0], res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  postBatches: async (req, res) => {
    try {
      // missing availability check
      // missing format check

      const { rows, rowCount } = await dao.postBatches(req.body);
      if (rowCount === 0) return t.res404("Batch cannot be created", res);
      t.res201payload(rows[0], res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  updateBatches: async (req, res) => {
    try {
      const params = {
        ...req.body,
        batchID: req.params.batchID,
        userID: req.user.user_id,
      };

      const { rowCount, rows } = await dao.updateBatches(params);
      if (rowCount === 0) return t.res404("Batch cannot be updated", res);
      t.res200payload(rows[0], res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  deleteBatches: async (req, res) => {
    try {
      const params = {
        userID: req.user.user_id,
        batchID: req.params.batchID,
      };

      const { rowCount, rows } = await dao.deleteBatches(params);
      if (rowCount === 0) return t.res404("Batch cannot be deleted", res);
      t.res200payload(rows[0], res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  deleteBatchesByMaterialID: async (req, res) => {
    try {
      const params = {
        userID: req.user.user_id,
        materialID: req.query.materialID,
      };

      const { rowCount, rows } = await dao.deleteBatchesByMaterialID(params);
      if (rowCount === 0) return t.res404("Batch cannot be deleted", res);
      t.res200msg(
        `Deleted all batches of materialID: ${req.query.materialID} successfully.`,
        res
      );
    } catch (err) {
      t.res500(err, res);
    }
  },
};
