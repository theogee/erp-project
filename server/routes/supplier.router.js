const express = require("express");
const router = express.Router();

const supplierController = require("../controller/supplier.controller");

router.put("/:supplierID", supplierController.updateSupplier);
router.delete("/:supplierID", supplierController.deleteSupplier);

module.exports = router;
