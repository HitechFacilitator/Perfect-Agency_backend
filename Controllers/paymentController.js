const Payment = require("../Models/paymentModel");
const Campaign = require("../Models/campaignModel");
const Training = require("../Models/trainingModel");
const Service = require("../Models/serviceModel");
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const createError = require('http-errors');

exports.initiatePayment = async (req, res, next) => {
    const { item_type, item_id, amount } = req.body;

    if (!item_type || !item_id || !amount) {
        return next(createError(400, "item_type, item_id, amount required"));
    }

    let payable;
    if (item_type === 'campaign') {
        payable = await Campaign.findOne({ _id: item_id, created_by: req.user._id });
    } else if (item_type === 'training') {
        payable = await Training.findById(item_id);
    } else if (item_type === 'service') {
        payable = await Service.findById(item_id);
    }

    if (!payable) return next(createError(404, `${item_type} not found`));

    try {
        const payload = {
            tx_ref: 'tx_' + Date.now(),
            amount,
            currency: "NGN",
            redirect_url: "http://localhost:5000/api/payments/verify",
            customer: {
                email: req.user.email,
                name: req.user.name
            },
            meta: {
                item_type,
                item_id
            }
        };

        const response = await flw.Transaction.initiate(payload);
        res.status(200).json(response);
    } catch (error) {
        next(createError(500, "Payment initiation failed"));
    }
};

exports.verifyPayment = async (req, res, next) => {
    const { transaction_id, tx_ref } = req.query;

    try {
        const response = await flw.Transaction.verify(tx_ref);
        if (response.status === 'successful') {
            const { item_type, item_id } = response.meta;
            const payment = new Payment({
                item_type,
                item_id,
                amount: response.amount,
                payment_method: response.payment_type,
                transaction_reference: tx_ref,
                status: "completed"
            });
            await payment.save();

            if (item_type === 'campaign') {
                const campaign = await Campaign.findById(item_id);
                campaign.status = "paid";
                await campaign.save();
            }
            // Handle other types

            res.status(200).json({ message: "Payment verified" });
        } else {
            res.status(400).json({ message: "Payment failed" });
        }
    } catch (error) {
        next(error);
    }
};


exports.getPayments = async (req, res, next) => {
    try {
        let filter = {};
        if (req.user.role === "client") {
            filter.item_id = { $in: await Campaign.find({ created_by: req.user._id }).map(c => c._id) };
            // Add training/service for client
        }

        const payments = await Payment.find(filter).populate('item_id');
        res.status(200).json(payments);
    } catch (error) {
        next(error);
    }
};

