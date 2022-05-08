const express = require("express");
const router = express.Router();

const businessController = require("../controller/business.controller");

router.post("/", businessController.postBusiness);
router.put("/:businessID", businessController.updateBusiness);

module.exports = router;
