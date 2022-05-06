const express = require("express");
const router = express.Router();
const batchesController = require("../controller/batches.controller");

router.get("/", batchesController.getBatches);

module.exports = router;
