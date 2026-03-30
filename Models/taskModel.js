const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    assigned_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    campaign_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
        default: null
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        default: null
    },
    status: {
        type: String,
        enum: ["pending", "in_progress", "done"],
        default: "pending"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    deadline: {
        type: Date,
    },

}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
