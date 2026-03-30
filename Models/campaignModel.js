const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    services_id: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Service",
        required: true
    },
    price :{
        type: Number,
    },
    budget: {
        type: Number,
        required: true,
    },
    start_date: {
        type: Date,
        // required: true,
    },
    end_date: {
        type: Date,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["pending", "rejected", "approved", "paid", "in_progress", "active", "completed"],
        default: "pending"
    },
    rejection_reason: {
        type: String,
    },
    assigned_marketer: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    }
}, { timestamps: true });

module.exports = mongoose.model("Campaign", campaignSchema);
