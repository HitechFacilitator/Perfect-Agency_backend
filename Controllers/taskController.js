const createError = require('http-errors');

const Task = require("../Models/taskModel");
const User = require("../Models/userModel");

exports.createTask = async (req, res, next) => {
    const { assigned_to } = req.body

    try {
        const user = await User.findById(assigned_to)
        if (!user) return next(createError(404, "The selected user does not exist"));
        if (user.role !== "marketer") {
            return next(createError(400, "The selected user doesn't have the required previleges"));
        }
        const task = new Task({
            ...req.body,
            assigned_by: req.user._id
        });
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        next(error);
    }
};

exports.getTasks = async (req, res, next) => {
    try {
        let filter = {};
        if (req.user.role === "marketer") {
            filter.assigned_to = req.user.id;
        }

        const tasks = await Task.find(filter).populate("assigned_to").populate("assigned_by");
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

exports.updateTaskStatus = async (req, res, next) => {
    const { status } = req.body;
    try {
        if (status && !["in_progress", "done"].includes(status)) {
            return next(createError(400, "Invalid Status"));
        }

        const actualTask = await Task.findById(req.params.id)
        if (!actualTask) return next(createError(404, "Task not found"));

        if (req.user.role === "marketer" && actualTask.assigned_to.toString() !== req.user.id.toString()) {
            return next(createError(400, "You don't have enough privilege to perform this action"));
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!updatedTask) return next(createError(404, "Task not found"));
        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return next(createError(404, "Task not found"));
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
};
