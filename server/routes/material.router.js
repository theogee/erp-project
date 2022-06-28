const express = require("express");
const router = express.Router();

const materialController = require("../controller/material.controller");

router.get("/", materialController.getMaterial);
router.get("/:materialID", materialController.getMaterialParams);
router.post("/", materialController.postMaterial);
router.put("/:materialID", materialController.updateMaterial);
router.delete("/:materialID", materialController.deleteMaterial);

module.exports = router;