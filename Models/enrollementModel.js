const mongoose = require("mongoose");

const enrollementSchema = new mongoose.Schema({
    user_id: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
    training_id: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Training",
    },
    payment_status: {
        type: String,
        enum: ["pending", "Fail", "Success"],
        default: "pending"
    },

}, { timestamps: true });

module.exports = mongoose.model("Enrollement", enrollementSchema);
