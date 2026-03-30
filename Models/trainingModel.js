const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    duration: {
        type: String,
    },
    type: {
        type: String,
        enum: ["Online", "On-Site", "Both"],
        default: "Both"
    },
    price: {
        type: Number,
        required: true,
    },
    scontent: {
        type: [String],
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model("Training", trainingSchema);
