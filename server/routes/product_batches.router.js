const express = require("express");
const router = express.Router();
const productBatchesController = require("../controller/product_batches.controller");

router.get("/p/:productID", productBatchesController.getProductBatches);
router.get(
  "/",
  productBatchesController.getProductBatchesByBusinessID
);
router.get(
  "/:productBatchID",
  productBatchesController.getProductBatchesByProductBatchID
);
router.post("/", productBatchesController.postProductBatch);
router.put("/:productBatchID", productBatchesController.updateProductBatch);
router.delete("/:productBatchID", productBatchesController.deleteProductBatch);

module.exports = router;
