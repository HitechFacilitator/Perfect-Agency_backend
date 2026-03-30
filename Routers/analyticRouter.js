const express = require("express");
const router = express.Router();

const analyticController = require("../Controllers/analyticController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/", authorize("marketer", "admin"), analyticController.addAnalytic);
router.get("/ads/:adsId", analyticController.getAnalyticsByAds);

module.exports = router;
