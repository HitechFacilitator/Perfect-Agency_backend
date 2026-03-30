const express = require("express");
const router = express.Router();

const announcementController = require("../Controllers/announcementController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", announcementController.getAnnouncements);
router.post("/", authorize("admin"), announcementController.createAnnouncement);
router.put("/:id", authorize("admin"), announcementController.updateAnnouncement);
router.delete("/:id", authorize("admin"), announcementController.deleteAnnouncement);

module.exports = router;

