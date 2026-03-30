const Announcement = require("../Models/announcementModel");
const createError = require('http-errors');

exports.createAnnouncement = async (req, res, next) => {
    try {
        const announcement = new Announcement(req.body);
        const savedAnnouncement = await announcement.save();
        res.status(201).json(savedAnnouncement);
    } catch (error) {
        next(error);
    }
};

exports.getAnnouncements = async (req, res, next) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json(announcements);
    } catch (error) {
        next(error);
    }
};

exports.updateAnnouncement = async (req, res, next) => {
    try {
        const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!announcement) return next(createError(404, "Announcement not found"));
        res.status(200).json(announcement);
    } catch (error) {
        next(error);
    }
};

exports.deleteAnnouncement = async (req, res, next) => {
    try {
        const deleted = await Announcement.findByIdAndDelete(req.params.id);
        if (!deleted) return next(createError(404, "Announcement not found"));
        res.status(200).json({ message: "Announcement deleted" });
    } catch (error) {
        next(error);
    }
};

