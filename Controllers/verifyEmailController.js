const jwt = require("jsonwebtoken");
const createError = require('http-errors');
const crypto = require('crypto');

const User = require("../Models/userModel");

exports.verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.params;

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            email_verify_token: hashedToken,
            verify_expiry: { $gt: Date.now() }
        });

        if (!user) {
            return next(createError(400, "Invalid or expired token"));
        }

        user.is_verified = true;
        user.email_verify_token = undefined;
        user.verify_expiry = undefined;

        await user.save();

        // Generate login token
        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10d" });
        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 10 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Email verified and logged in" });
    } catch (error) {
        next(error);
    }
};

