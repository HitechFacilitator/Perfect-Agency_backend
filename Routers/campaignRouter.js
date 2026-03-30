const express = require("express");
const router = express.Router();

const campaignController = require("../Controllers/campaignController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/", campaignController.createCampaign);

router.get("/", campaignController.getCampaigns);
router.get("/all", authorize("admin"), campaignController.getAllCampaigns);

router.put("/:id", authorize("admin", "client"), campaignController.updateCampaign);
router.put("/:id/review", authorize("admin"), campaignController.reviewCampaign);
router.put("/:id/pay", campaignController.payCampaign);
router.put("/:id/status", authorize("admin", "marketer"), campaignController.updateCampaignStatus);
router.delete("/:id", authorize("admin", "client"), campaignController.deleteCampaign);

module.exports = router;
