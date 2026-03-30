const Ads = require("../Models/adsModel");
const Campaign = require("../Models/campaignModel");
const createError = require('http-errors');
const { cloudinary, storage } = require("../config/cloudinaryConfig");
const multer = require('multer');
const upload = multer({ storage });


exports.createAd = async (req, res, next) => {
    try {
        const { campaign_id, type, platform, status, content_url } = req.body;

        if (!campaign_id || !type || !platform) {
            return next(createError(400, "campaign_id, type or platform required"));
        }

        const campaign = await Campaign.findById(campaign_id);
        if (!campaign) return next(createError(404, "Campaign not found"));

        if (req.user.role === "marketer" && !campaign.assigned_marketer.some(id => id.toString() === req.user._id.toString())) {
            return next(createError(403, "Not assigned to this campaign"));
        }
        if (campaign.status !== "in_progress" && campaign.status !== "active") {
            return next(createError(404, "Wait for this campaign to be ready"));
        }

        const ad = new Ads({
            campaign_id,
            type,
            content_url,
            platform,
            status: status || "pending",
        });

        const savedAd = await ad.save();
        res.status(201).json(savedAd);
    } catch (error) {
        next(error);
    }
};


exports.getAdsByCampaign = async (req, res, next) => {
    try {
        const ads = await Ads.find({ campaign_id: req.params.campaignId }).populate("campaign_id");
        res.status(200).json(ads);
    } catch (error) {
        next(error);
    }
};

exports.getAllAds = async (req, res, next) => {
    try {
        const ads = await Ads.find({}).populate("campaign_id", "title status");
        res.status(200).json(ads);
    } catch (error) {
        next(error);
    }
};


exports.updateAdStatus = async (req, res, next) => {
    const { status } = req.body;
    if (status && !["active", "pause", "completed"].includes(status)) {
        return next(createError(400, "Invalid Status"));
    }
    try {
        const updatedAd = await Ads.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updatedAd) return next(createError(404, "Ad not found"));
        res.status(200).json(updatedAd);
    } catch (error) {
        next(error);
    }
};

exports.deleteAds = async (req, res, next) => {
    try {
        const deletedAds = await Ads.findByIdAndDelete(req.params.id);
        if (!deletedAds) return next(createError(404, "Ads not found"));
        res.status(200).json({ message: "Ads deleted successfully" });
    } catch (error) {
        next(error);
    }
};
