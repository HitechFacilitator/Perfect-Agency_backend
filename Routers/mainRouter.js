const express = require("express");
const router = express.Router();

const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const campaignRouter = require("./campaignRouter");
const adsRouter = require("./adsRouter");
const analyticRouter = require("./analyticRouter");
// const paymentRouter = require("./paymentRouter");
const announcementRouter = require("./announcementRouter");
const taskRouter = require("./taskRouter");
const packRouter = require("./packRouter");
const enrollementRouter = require("./enrollementRouter");
const serviceRouter = require("./serviceRouter");

router.get('/', (req, res) => {
    res.json("!!! Welcome to our Marketing Platform !!!")
})

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/campaigns", campaignRouter);
router.use("/ads", adsRouter);
router.use("/analytics", analyticRouter);
// router.use("/payments", paymentRouter);
router.use("/tasks", taskRouter);
router.use("/packs", packRouter);
router.use("/enrollements", enrollementRouter);


router.use("/services", serviceRouter);
router.use("/announcements", announcementRouter);

module.exports = router;


