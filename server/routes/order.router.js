const express = require("express");
const router = express.Router();

const orderController = require("../controller/order.controller");

router.get("/", orderController.getOrder);
router.get("/:orderID", orderController.getOrderByID);
router.post("/", orderController.postOrder);
router.delete("/:orderID", orderController.deleteOrder);
// experimental (working) ~ feature only update order_date and qty
router.put("/:orderID", orderController.updateOrder);

module.exports = router;
