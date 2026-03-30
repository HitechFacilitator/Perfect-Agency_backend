const express = require("express");
const router = express.Router();

const adsController = require("../Controllers/adsController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/", authorize("marketer", "admin"), adsController.createAd);
router.get("/campaign/:campaignId", adsController.getAdsByCampaign);
router.get("/all", authorize("admin"), adsController.getAllAds);
router.put("/:id/status", authorize("marketer", "admin"), adsController.updateAdStatus);
router.delete("/:id", authorize("marketer", "admin"), adsController.deleteAds);

module.exports = router;
