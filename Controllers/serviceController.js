const createError = require('http-errors');
const Service = require("../Models/serviceModel");

exports.createService = async (req, res, next) => {
    try {
        const { name, description, price } = req.body;

        if (!name || !price) {
            return next(createError(400, "Name and price are required"));
        }

        const service = new Service({
            name,
            description,
            price: parseFloat(price)
        });

        const savedService = await service.save();
        res.status(201).json(savedService);
    } catch (error) {
        next(error);
    }
};

exports.getServices = async (req, res, next) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.status(200).json(services);
    } catch (error) {
        next(error);
    }
};

exports.getServiceById = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return next(createError(404, "Service not found"));
        res.status(200).json(service);
    } catch (error) {
        next(error);
    }
};

exports.updateService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!service) return next(createError(404, "Service not found"));
        res.status(200).json(service);
    } catch (error) {
        next(error);
    }
};

exports.deleteService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) return next(createError(404, "Service not found"));
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        next(error);
    }
};

