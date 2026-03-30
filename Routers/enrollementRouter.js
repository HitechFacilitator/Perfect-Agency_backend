const express = require("express");
const router = express.Router();
const enrollementController = require("../Controllers/enrollementController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/", enrollementController.createEnrollement);
router.get("/", enrollementController.getEnrollements);
router.put("/:id/status", authorize("admin"), enrollementController.updateEnrollementStatus);

module.exports = router;

