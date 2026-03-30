const mongoose = require("mongoose");

const analyticSchema = new mongoose.Schema({
    ads_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ads"
    },
    views: {
        type: Number,
        required: true,
        default: 0
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    conversions: {
        type: Number,
        required: true,
        default: 0
    },
    cost: {
        type: Number,
    },
    date: {
        type: Date,
    },

}, { timestamps: true });

module.exports = mongoose.model("Analytic", analyticSchema);
