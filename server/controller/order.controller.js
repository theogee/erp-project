const daoOrder = require("../dao/order.dao");
const daoProduct = require("../dao/product.dao");
const daoOrderProduct = require("../dao/order_product.dao");
const daoProductBatches = require("../dao/product_batches.dao");
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

      data = { ...data, order_items: rows };

      t.res200payload(data, res);
    } catch (err) {
      t.res500(err, res);
    }
  },
  postOrder: async (req, res) => {
    try {
      // missing availability check
      // missing format check
      console.log(req.body);

      const { rowCount, rows } = await daoOrder.postOrder(req.body);

      if (rowCount === 0) return t.res404("Order cannot be created", res);

      // duplicate data from product table to record the current name and price
      // duplicatedOrderData = await req.body.orderItems.map(async (item) => {
      //   const { rows } = await daoProduct.getProductParams({
      //     productID: item.productID,
      //   });
      //   return {
      //     productName: rows[0].name,
      //     productPrice: rows[0].price,
      //     qty: item.qty,
      //   };
      // });
      let duplicatedOrderData = [];
      for (let i = 0; i < req.body.orderItems.length; i++) {
        const { rows } = await daoProduct.getProductParams({
          productID: req.body.orderItems[i].productID,
        });
        duplicatedOrderData.push({
          productName: rows[0].name,
          productPrice: rows[0].price,
          qty: req.body.orderItems[i].qty,
        });
        console.log(duplicatedOrderData);
      }

      await daoOrderProduct.postAllProductByOrderID({
        orderID: rows[0].order_id,
        orderItems: duplicatedOrderData,
      });

      // start the transaction, reduce product_batch qty
      for (let i = 0; i < req.body.orderItems.length; i++) {
        // fetch all (finsihed/green) batches of the product
        let { rows: productBatchesData } =
          await daoProductBatches.getProductBatches(
            req.body.orderItems[i].productID
          );
        productBatchesData = productBatchesData.filter(
          (d) => d.status === "green"
        );

        // use batches qty to fullfil the needed qty
        let neededQty = req.body.orderItems[i].qty;
        for (let j = 0; j < productBatchesData.length; j++) {
          // skip batch which has 0 qty -> the data is not deleted bcs it may be useful for accounting module
          if (productBatchesData[j].qty === 0) continue;

          // update qty from product_batches
          let qtyLeft;
          if (neededQty >= productBatchesData[j].qty) qtyLeft = 0;
          else qtyLeft = productBatchesData[j].qty - neededQty;

          await daoProductBatches.updateProductBatch({
            qty: qtyLeft,
            productBatchID: productBatchesData[j].product_batch_id,
            businessID: req.body.businessID,
          });

          // because we've used a batch, we reduce the needed qty
          neededQty = neededQty - productBatchesData[j].qty;

          // loop through all batches untill the needed qty is fullfilled
          if (neededQty <= 0) break;
        }
      }

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
