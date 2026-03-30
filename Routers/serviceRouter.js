const express = require("express");
const router = express.Router();

const serviceController = require("../Controllers/serviceController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", serviceController.getServices);
router.get("/:id", serviceController.getServiceById);
router.post("/", authorize("admin"), serviceController.createService);
router.put("/:id", authorize("admin"), serviceController.updateService);
router.delete("/:id", authorize("admin"), serviceController.deleteService);

module.exports = router;

