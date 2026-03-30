const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require('http-errors');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { isEmpty } = require("validator")
const { default: isEmail } = require("validator/lib/isEmail");

const User = require("../Models/userModel");
const sendEmail = require("../utils/sendEmail")


const generateToken = (res, id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "10d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 10 * 24 * 60 * 60 * 1000,
    });
};

exports.registerUser = async (req, res, next) => {
    const { name, email, password, phone, role, account_type, business_name } = req.body;


    if (isEmpty(name) || isEmpty(password) || isEmpty(email) || isEmpty(phone)) {
        return next(createError(400, "Please enter all required fields"));
    }
    if (!isEmail(email)) {
        return next(createError(400, "Please enter a valid email address"));
    }
    if (phone) {
        const phoneStr = String(phone);
        if (!/^\d{9,}$/.test(phoneStr)) {
            throw createError(400, "Phone number must be at least 9 numerical digits");
        }
    }
    if(account_type === "business" && !business_name){
            throw createError(400, "Enter your business or enterprise name");
    }

    try {
        const userExists = await User.findOne({ email });
        const userExistsPhone = await User.findOne({ phone });
        if (userExists || userExistsPhone) {
            return next(createError(400, "User with the entered email or phone No already exists"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verifyToken = crypto.randomBytes(32).toString('hex') + crypto.randomBytes(32).toString('hex');
        const hashedVerifyToken = crypto.createHash('sha256').update(verifyToken).digest('hex');
        const verifyExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
/*
        const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${verifyToken}`;
        
        await sendEmail(
            email,
            "Verify Your Account",
            "This is you verification link for the PERFECT AGENCY platform",
            "This link will expire in 15 minutes",
            `<p>Click the link below to verify your email address:</p><a href="${verificationUrl}">Verify Email</a>`,
        );
*/
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role,
            account_type,
            business_name,
            email_verify_token: hashedVerifyToken,
            verify_expiry: verifyExpiry,
            is_verified: false
        });

        if (user) {
            res.status(201).json({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            return next(createError(400, "Invalid user data"));
        }
    } catch (error) {
        next(error);
    }
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return next(createError(400, "Please enter email and password"));
        }

        const user = await User.findOne({ email });

        if (!user) {
            return next(createError(401, "Invalid email or password"));
        }

        if (!user.is_verified) {
            return next(createError(400, "Please verify your email first"));
        }
        
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            generateToken(res, user._id);

            res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            return next(createError(401, "Invalid email or password"));
        }
    } catch (error) {
        next(error);
    }
};

exports.logoutUser = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
};
