const express = require("express");
const router = express.Router();
const measurementController = require("../controller/measurement.controller.js");

router.get("/", measurementController.getMeasurement);

module.exports = router;
