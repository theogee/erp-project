const daoOrder = require("../dao/order.dao");
const daoOrderProduct = require("../dao/order_product.dao");
const t = require("../template/response.template");

module.exports = {
  getOrder: async (req, res) => {
    try {
      const { rowCount, rows } = await daoOrder.getOrder(req.query);

      if (rowCount === 0) return t.res404("Resource not found", res);

      t.res200payload(rows, res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  getOrderByID: async (req, res) => {
    try {
      let data, rowCount, rows;

      ({ rowCount, rows } = await daoOrder.getOrderByID(req.params));

      if (rowCount === 0) return t.res404("Resource not found", res);

      data = { ...rows[0] };

      ({ rowCount, rows } = await daoOrderProduct.getAllProductByOrderID(
        req.params
      ));

      data = { ...data, orderItems: rows };

      t.res200payload(data, res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  postOrder: async (req, res) => {
    try {
      // missing availability check
      // missing format check

      const { rowCount, rows } = await daoOrder.postOrder(req.body);

      if (rowCount === 0) return t.res404("Order cannot be created", res);

      await daoOrderProduct.postAllProductByOrderID({
        orderID: rows[0].order_id,
        orderItems: req.body.orderItems,
      });

      t.res201payload(rows[0], res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  updateOrder: async (req, res) => {
    try {
      const { orderID } = req.params;

      const { orderDate, orderItems } = req.body;

      if (orderDate) {
        const { rowCount } = await daoOrder.updateOrder({ orderID, orderDate });
        if (rowCount === 0) return t.res404("Resource not found", res);
      }

      if (orderItems) {
        await Promise.all(
          orderItems.map((item) =>
            daoOrderProduct.updateProductByOrderID({ orderID, orderItem: item })
          )
        );
      }

      module.exports.getOrderByID(req, res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const { rowCount } = await daoOrderProduct.deleteProductByOrderID(
        req.params
      );

      if (rowCount === 0) return t.res404("Resource not found", res);

      const { rows } = await daoOrder.deleteOrder(req.params);

      t.res200payload(rows[0], res);
    } catch (err) {
      t.res500(err, res);
    }
  },
};
