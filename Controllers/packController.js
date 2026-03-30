const createError = require('http-errors');
const Pack = require("../Models/packModel");

exports.createPack = async (req, res, next) => {
    try {
        const pack = new Pack(req.body);
        const savedPack = await pack.save();
        res.status(201).json(savedPack);
    } catch (error) {
        next(error);
    }
};

exports.getPacks = async (req, res, next) => {
    try {
        const packs = await Pack.find().sort({ createdAt: -1 });
        res.status(200).json(packs);
    } catch (error) {
        next(error);
    }
};

exports.getPackById = async (req, res, next) => {
    try {
        const pack = await Pack.findById(req.params.id);
        if (!pack) return next(createError(404, "Pack not found"));
        res.status(200).json(pack);
    } catch (error) {
        next(error);
    }
};

exports.updatePack = async (req, res, next) => {
    try {
        const pack = await Pack.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pack) return next(createError(404, "Pack not found"));
        res.status(200).json(pack);
    } catch (error) {
        next(error);
    }
};

exports.deletePack = async (req, res, next) => {
    try {
        const deleted = await Pack.findByIdAndDelete(req.params.id);
        if (!deleted) return next(createError(404, "Pack not found"));
        res.status(200).json({ message: "Pack deleted" });
    } catch (error) {
        next(error);
    }
};

