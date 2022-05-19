const express = require("express");
const router = express.Router();

const orderController = require("../controller/order.controller");

router.get("/", orderController.getOrder);

module.exports = router;
