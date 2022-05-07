const express = require("express");
const router = express.Router();
const batchesController = require("../controller/batches.controller");

router.get("/", batchesController.getBatches);
router.post("/", batchesController.postBatches);
router.put("/:batchID", batchesController.updateBatches);
router.delete("/:batchID", batchesController.deleteBatches);

module.exports = router;
