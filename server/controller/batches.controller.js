const dao = require("../dao/batches.dao");
const tmplt = require("../template/response.template");

module.exports = {
  getBatches: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getBatches(req.body);

      if (rowCount === 0) return tmplt.res404("Resource not found", res);

      tmplt.res200payload(rows, res);
    } catch (err) {
      tmplt.res500(err, res);
    }
  },
};
