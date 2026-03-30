const express = require("express");
const router = express.Router();

const paymentController = require("../Controllers/paymentController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect)
router.use(authorize("client", "admin"))
 
router.post("/initiate", paymentController.initiatePayment);
router.get("/verify", paymentController.verifyPayment);
router.get("/", paymentController.getPayments);

router.get("/", paymentController.getPayments);

module.exports = router;
