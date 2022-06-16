const express = require("express");
const router = express.Router();
const productMaterialController = require("../controller/product_material.controller");

router.get("/", productMaterialController.getAllMaterialOfProductID);
//router.get("/:productID", productMaterialController.getProductParams);
router.post("/", productMaterialController.postAllMaterialOfProductID);
//router.put("/:productID", productMaterialController.updateProduct);
//router.delete("/:productID", productMaterialController.deleteProduct);

module.exports = router;
