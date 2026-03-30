const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema({
    campaign_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
        required: true,
    },
    type: {
        type: String,
        enum: ["image", "video", "text", "others"],
        required: true,
    },
    content_url: {
        type: String,
    },
    platform: {
        type: String,
        enum: ["facebook", "instagram", "tiktok", "whatsapp", "google", "other"],
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "active", "pause", "completed"],
        default: "pending"
    },

}, { timestamps: true });

module.exports = mongoose.model("Ads", adsSchema);
