const dao = require("../dao/measurement.dao");
const t = require("../template/response.template");

module.exports = {
  getMeasurement: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getMeasurement();

      if (rowCount === 0)
        return t.res404("Measurement cannot be retrieved", res);

      t.res200payload(rows, res);
    } catch (err) {
      t.res500(err, res);
    }
  },
};
