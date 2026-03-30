const mongoose = require("mongoose");

const packSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    features: {
        type: [String],
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model("Pack", packSchema);
