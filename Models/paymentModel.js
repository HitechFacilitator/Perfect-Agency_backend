const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
    },

    item_type: {
        type: String,
        enum: ["campaign", "training", "service"]
    },
    
    amount: {
        type: Number,
        required: true
    },
    payment_method: {
        type: String,
        enum: ["orange_money", "mobile_money", "card", "bank_transfer", "other"],
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    transaction_reference: {
        type: String,
    },

}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
