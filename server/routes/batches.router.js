const express = require("express");
const router = express.Router();
const batchesController = require("../controller/batches.controller");

router.get("/", batchesController.getBatches);
router.get("/:batchID", batchesController.getBatchesByID);
router.post("/", batchesController.postBatches);
router.put("/:batchID", batchesController.updateBatches);
router.delete("/", batchesController.deleteBatchesByMaterialID);
router.delete("/:batchID", batchesController.deleteBatches);

module.exports = router;
