const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);
