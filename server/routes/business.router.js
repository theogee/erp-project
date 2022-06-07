const express = require("express");
const router = express.Router();

const businessController = require("../controller/business.controller");

router.get("/", businessController.getBusiness);
router.get("/:businessID", businessController.getBusinessByID);
router.delete("/:businessID", businessController.deleteBusiness);
router.post("/", businessController.postBusiness);
router.put("/:businessID", businessController.updateBusiness);

module.exports = router;
