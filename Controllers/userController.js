const User = require("../Models/userModel");
const createError = require('http-errors');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return next(createError(404, "User not found"));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const actualUser = await User.findById(req.params.id);

        if (!actualUser) {
            return next(createError(404, "User not found"));
        } else {
            if (req.user !== "admin" && actualUser._id !== req.params.id){
                return next(createError(400, "Unauthorised to perform this action"));
            }
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return next(createError(404, "User not found"));
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return next(createError(404, "User not found"));
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};
