const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["admin", "marketer", "client"],
        default: "client"
    },
    account_type: {
        type: String,
        enum: ["individual", "business"],
        default: "individual"
    },
    business_name: {
        type: String,
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    email_verify_token: {
        type: String,
    },
    verify_expiry: {
        Date
    }
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);
