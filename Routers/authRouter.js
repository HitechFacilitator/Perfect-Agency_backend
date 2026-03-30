const express = require("express");
const router = express.Router();

const { registerUser, loginUser, logoutUser } = require("../Controllers/authController");
const { verifyEmail } = require("../Controllers/verifyEmailController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/verify-email/:token", verifyEmail);

module.exports = router;

