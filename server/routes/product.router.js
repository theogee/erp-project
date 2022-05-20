const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller");

router.get("/", productController.getProduct);
router.get("/:productID", productController.getProductParams);
router.post("/", productController.postProduct);
router.put("/:productID", productController.updateProduct);
router.delete("/:productID", productController.deleteProduct);

module.exports = router;