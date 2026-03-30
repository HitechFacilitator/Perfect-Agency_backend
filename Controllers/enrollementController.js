const createError = require('http-errors');
const Enrollement = require("../Models/enrollementModel");
const Training = require("../Models/trainingModel");
const User = require("../Models/userModel");

exports.createEnrollement = async (req, res, next) => {
    try {
        const { training_id } = req.body;
        const training = await Training.findById(training_id);
        if (!training) return next(createError(404, "Training not found"));

        const enrollement = new Enrollement({
            user_id: req.user._id,
            training_id,
            payment_status: "pending"
        });

        const saved = await enrollement.save();
        res.status(201).json(saved);
    } catch (error) {
        next(error);
    }
};

exports.getEnrollements = async (req, res, next) => {
    try {
        let filter = {};
        if (req.user.role === "client") {
            filter.user_id = req.user._id;
        }

        const enrollements = await Enrollement.find(filter).populate("training_id").populate("user_id", "name email");
        res.status(200).json(enrollements);
    } catch (error) {
        next(error);
    }
};

exports.updateEnrollementStatus = async (req, res, next) => {
    try {
        const { payment_status } = req.body;
        const enrollement = await Enrollement.findByIdAndUpdate(req.params.id, { payment_status }, { new: true });
        if (!enrollement) return next(createError(404, "Enrollement not found"));
        res.status(200).json(enrollement);
    } catch (error) {
        next(error);
    }
};

