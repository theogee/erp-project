const express = require("express");
const router = express.Router();
const productBatchesController = require("../controller/product_batches.controller");

router.get("/p/:productID", productBatchesController.getProductBatches);
router.get(
  "/pb/:productBatchID",
  productBatchesController.getProductBatchesParams
);
router.post("/", productBatchesController.postProductBatch);
router.put("/:productBatchID", productBatchesController.updateProductBatch);
router.delete("/:productBatchID", productBatchesController.deleteProductBatch);

module.exports = router;
