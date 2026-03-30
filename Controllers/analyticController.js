const Analytic = require("../Models/analyticModel");
const createError = require('http-errors');

exports.addAnalytic = async (req, res, next) => {
    try {
        const analytic = new Analytic(req.body);
        const savedAnalytic = await analytic.save();
        res.status(201).json(savedAnalytic);
    } catch (error) {
        next(error);
    }
};

exports.getAnalyticsByAds = async (req, res, next) => {
    try {
        const analytics = await Analytic.find({ ads_id: req.params.adsId }).sort({ date: -1 });
        res.status(200).json(analytics);
    } catch (error) {
        next(error);
    }
};

