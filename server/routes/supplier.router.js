const express = require("express");
const router = express.Router();

const supplierController = require("../controller/supplier.controller");

router.get("/", supplierController.getSupplier);
router.get("/:supplierID", supplierController.getSupplierParams);
router.post("/", supplierController.postSupplier);
router.put("/:supplierID", supplierController.updateSupplier);
router.delete("/:supplierID", supplierController.deleteSupplier);

module.exports = router;
