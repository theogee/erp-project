const dao = require("../dao/order.dao");
const t = require("../template/response.template");

module.exports = {
  getOrder: async (req, res) => {
    try {
      const { rowCount, rows } = await dao.getOrder(req.body);

      if (rowCount === 0) return t.res404("Resource not found", res);

      t.res200payload(rows, res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  getOrderByID: async (res, req) => {
    try {
      const { rowCount, rows } = await dao.getOrderByID({
        orderID: req.params.orderID,
      });

      if (rowCount === 0) return t.res404("Resource not found", res);

      t.res200payload(rows[0], res);
    } catch (err) {
      t.res500(err, res);
    }
  },
};
