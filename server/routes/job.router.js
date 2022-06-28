const express = require("express");
const router = express();
const jobController = require("../controller/job.controller");

router.post("/", jobController.postJob);
router.put("/:productBatchID/verify", jobController.verifyJob);
router.put("/:productBatchID/cancel", jobController.cancelJob);

module.exports = router;
