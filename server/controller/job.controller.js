const productBatchDao = require("../dao/product_batches.dao");
const productMaterialDao = require("../dao/product_material.dao.js");
const materialDao = require("../dao/material.dao");
const batchesDao = require("../dao/batches.dao");
const inUseBatchDao = require("../dao/in_use_batch.dao");
const validateProductBatch = require("../validator/product_batches.validator");
const t = require("../template/response.template");

module.exports = {
  postJob: async (req, res) => {
    try {
      // validate body
      const error = validateProductBatch(req.body);

      if (error.error) {
        return t.res400(error.msg, res);
      }

      // fetch all material for the product
      const { rows: productMaterialData } =
        await productMaterialDao.getAllMaterialOfProductID({
          productID: req.body.productID,
        });

      // check if material total qty is enough
      for (let i = 0; i < productMaterialData.length; i++) {
        const TOTAL_QTY_NEEDED = req.body.qty * productMaterialData[i].qty;

        const { rows: materialData } = await materialDao.getMaterialParams({
          materialID: productMaterialData[i].material_id,
        });

        console.log(materialData);

        if (materialData[0].cummulative_qty < TOTAL_QTY_NEEDED) {
          return t.res400(
            `Insufficient material: ${productMaterialData[i].name}. Please refill your stock and try again.`,
            res
          );
        }
      }

      // insert to product_batch
      const { rows: productBatchData } = await productBatchDao.postProductBatch(
        {
          ...req.body,
          status: "yellow",
        }
      );

      // start the transaction, reduce the current qty of batches and insert in to in_use_batch
      for (let i = 0; i < productMaterialData.length; i++) {
        // fetch all batches of the material
        const { rows: materialBatchesData } = await batchesDao.getBatches({
          materialID: productMaterialData[i].material_id,
        });

        // use batches qty to fullfil the needed qty
        let neededQty = req.body.qty * productMaterialData[i].qty;
        for (let j = 0; j < materialBatchesData.length; j++) {
          // skip batch which has 0 qty -> the data is not deleted bcs it may be useful for accounting module
          if (materialBatchesData[j].current_qty === 0) continue;

          // update current_qty from material batch
          let qtyLeft;
          if (neededQty >= materialBatchesData[j].current_qty) qtyLeft = 0;
          else qtyLeft = materialBatchesData[j].current_qty - neededQty;

          await batchesDao.updateBatches({
            currentQty: qtyLeft,
            batchID: materialBatchesData[j].batch_id,
            userID: req.user.user_id,
          });

          // insert to in_use_batch
          await inUseBatchDao.postInUseBatch({
            productBatchID: productBatchData[0].product_batch_id,
            materialBatchID: materialBatchesData[j].batch_id,
            qty: qtyLeft === 0 ? materialBatchesData[j].current_qty : neededQty,
          });

          // because we've used a batch, we reduce the needed qty
          neededQty = neededQty - materialBatchesData[j].current_qty;

          // loop through all batches untill the needed qty is fullfilled
          if (neededQty <= 0) break;
        }
      }

      t.res201payload(
        { product_batch_id: productBatchData[0].product_batch_id },
        res
      );
    } catch (err) {
      t.res500(err, res);
    }
  },
  verifyJob: async (req, res) => {
    try {
      // change product batch status to finished(green)
      const { productBatchID } = req.params;
      const { businessID } = req.body;

      await productBatchDao.updateProductBatch({
        status: "green",
        productBatchID,
        businessID,
      });

      // delete all in_use_batch with the specifict product_batch_id
      await inUseBatchDao.deleteInUseBatch({ productBatchID });
      t.res201msg(
        `product batch id (job): ${productBatchID} verified successfully`,
        res
      );
    } catch (err) {
      t.res500(err, res);
    }
  },
  cancelJob: async (req, res) => {
    try {
      // change product batch status to cancelled(red)
      const { productBatchID } = req.params;
      const { businessID } = req.body;

      await productBatchDao.updateProductBatch({
        status: "red",
        productBatchID,
        businessID,
      });

      // return all stock from in_use_batch to respective batch
      const { rows: inUseBatchData } =
        await inUseBatchDao.getInUseBatchByProductBatchID({ productBatchID });

      inUseBatchData.forEach(async (iuBatch) => {
        const { rows: batchData } = await batchesDao.getBatchesByID({
          batchID: iuBatch.material_batch_id,
        });
        await batchesDao.updateBatches({
          currentQty: batchData[0].current_qty + iuBatch.qty,
          batchID: iuBatch.material_batch_id,
          userID: req.user.user_id,
        });
      });

      // delete all in_use_batch with the specific product_batch_id
      await inUseBatchDao.deleteInUseBatch({ productBatchID });
      t.res201msg(
        `product batch id (job): ${productBatchID} cancelled successfully`,
        res
      );
    } catch (err) {
      t.res500(err, res);
    }
  },
};
