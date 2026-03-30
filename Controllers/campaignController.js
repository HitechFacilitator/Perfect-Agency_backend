const createError = require('http-errors');

const Campaign = require("../Models/campaignModel");

exports.createCampaign = async (req, res, next) => {
    try {
        const Service = require("../Models/serviceModel");
        const servicesIds = req.body.services_id;
        if (servicesIds.length < 2) {
            return next(createError(400, "Campaign must include at least two services"));
        }

        const services = await Service.find({ _id: { $in: servicesIds } });
        if (services.length !== servicesIds.length) {
            return next(createError(400, "One or more services not found"));
        }

        let totalPrice = 0;
        services.forEach(service => totalPrice += service.price);
        const discountedPrice = totalPrice * 0.9;
        const lowPrice = totalPrice * 0.8;

        const campaign = new Campaign({
            ...req.body,
            price: discountedPrice,
            created_by: req.user._id
        });

        if (campaign.budget < lowPrice) {
            return next(createError(400, "Budget too low for selected services"));
        }

        const savedCampaign = await campaign.save();
        res.status(201).json(savedCampaign);
    } catch (error) {
        next(error);
    }
};



exports.getCampaigns = async (req, res, next) => {
    try {
        let filter = {};

        if (req.user.role === "client") {
            filter.created_by = req.user._id;
        } else if (req.user.role === "marketer") {
            filter.assigned_marketer = req.user._id;
        }

        const campaigns = await Campaign.find(filter).populate("services_id", "name description price").populate("assigned_marketer", "name email").populate("created_by", "name email");

        res.status(200).json(campaigns);
    } catch (error) {
        next(error);
    }
};

exports.getAllCampaigns = async (req, res, next) => {
    try {
        const campaigns = await Campaign.find({}).populate("services_id", "name description price").populate("assigned_marketer", "name email").populate("created_by", "name email");
        res.status(200).json(campaigns);
    } catch (error) {
        next(error);
    }
};


exports.reviewCampaign = async (req, res, next) => {
    const { status, rejection_reason, assigned_marketer } = req.body;

    if (!["approved", "rejected"].includes(status)) {
        return next(createError(400, "Invalid review status. Must be 'approved' or 'rejected'."));
    }

    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) return next(createError(404, "Campaign not found"));

        campaign.status = status;
        if (status === "rejected") {
            if (!rejection_reason) {
                return next(createError(400, "Rejection reason is required"));
            }
            campaign.rejection_reason = rejection_reason;
        } else {
            if (!assigned_marketer) {
                return next(createError(400, "Assigned marketer is required"));
            }
            const marketer = await User.findById(assigned_marketer);
            if (!marketer) {
                return next(createError(404, "Marketer not found"));
            }
            if (marketer.role !== "marketer") {
                return next(createError(400, "Assigned user is not a marketer"));
            }
            campaign.assigned_marketer = assigned_marketer;
        }

        const updatedCampaign = await campaign.save();
        res.status(200).json(updatedCampaign);
    } catch (error) {
        next(error);
    }
};


exports.payCampaign = async (req, res, next) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) return next(createError(404, "Campaign not found"));

        if (campaign.status !== "approved") {
            return next(createError(400, "Campaign must be approved before payment"));
        }

        // Logic for payment integration (Flutterwave) would go here
        // For now, we simulate 

        campaign.status = "paid";
        const updatedCampaign = await campaign.save();
        res.status(200).json(updatedCampaign);
    } catch (error) {
        next(error);
    }
};

exports.updateCampaignStatus = async (req, res, next) => {
    const { status } = req.body;
    const allowedTransitions = ["in_progress", "active", "completed"];

    if (!allowedTransitions.includes(status)) {
        return next(createError(400, "Invalid status update"));
    }

    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) return next(createError(404, "Campaign not found"));

        if (
            ["in_progress", "active", "completed"].includes(status) &&
            ["pending", "rejected"].includes(campaign.status)
        ) {
            return next(createError(400, "Cannot progress until campaign is approved and paid"));
        }

        if (
            req.user.role === "marketer" &&
            !campaign.assigned_marketer.some(
                (marketerId) => marketerId.toString() === req.user.id.toString()
            )
        ) {
            return next(createError(403, "Unauthorized to update this campaign"));
        }

        campaign.status = status;
        const updatedCampaign = await campaign.save();
        res.status(200).json(updatedCampaign);
    } catch (error) {
        next(error);
    }
};

exports.updateCampaign = async (req, res, next) => {
    try {
        const actualCampaign = await Campaign.findById(req.params.id);
        if (!actualCampaign) return next(createError(404, "Campaign not found"));

        if (req.user.role === "client" && req.user.id !== actualCampaign.created_by.toString()) {
            return next(createError(403, "Unauthorized to update this campaign"));
        }
        if (actualCampaign.status !== "pending") {
            return next(createError(400, "Campaign has been validated/rejected no possible update allowed"));
        }
        const updatedCampaign = await Campaign.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json(updatedCampaign);
    } catch (error) {
        next(error);
    }
};

exports.deleteCampaign = async (req, res, next) => {
    try {
        const deletedCampaign = await Campaign.findById(req.params.id);
        if (!deletedCampaign) return next(createError(404, "Campaign not found"));

        if (req.user.role === "client" && req.user.id !== deletedCampaign.created_by.toString()) {
            return next(createError(403, "Unauthorized to delet this campaign"));
        }
        await Campaign.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Campaign deleted successfully" });
    } catch (error) {
        next(error);
    }

};
