const express = require("express");
const router = express.Router();
const packController = require("../Controllers/packController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/", authorize("admin"), packController.createPack);
router.get("/", packController.getPacks);
router.get("/:id", packController.getPackById);
router.put("/:id", authorize("admin"), packController.updatePack);
router.delete("/:id", authorize("admin"), packController.deletePack);

module.exports = router;

