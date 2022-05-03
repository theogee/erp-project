const express = require("express");
const router = express.Router();

const supplierController = require("../controller/supplier.controller");

router.get("/", supplierController.getSupplier);
router.post("/", supplierController.postSupplier);

module.exports = router;