const express = require("express");
const Checkout = require("../models/CheckOut");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST  /api/checkout
// @desc Create a new Checkout session
// @access Private
router.post("/", protect, async (req, res) => {
    // console.log("checkout create data", req.body);

    const {
        CheckoutItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
    } = req.body;

    if (!CheckoutItems || CheckoutItems.length === 0) {
        return res.status(400).json({ message: "No items in checkout." });
    }

    try {
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkOutItem: CheckoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,
        });
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("Checkout Error:", error);
        res.status(500).json({ message: "Server error during checkout", error: error.message });
    }
});

// @route PUT /api/checkout/:id/pay
// @desc Update the checkout to mark as paid after successful payment
// @access Private
router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();

            await checkout.save();

            return res.status(200).json({ message: "Payment successful", checkout });
        } else {
            return res.status(400).json({ message: "Invalid Payment Status" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment complete
// @access Private
router.post("/:id/finalize", protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);

        //console.log(checkout);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }
        //onsole.log("pass", checkout);
        if (checkout.isPaid && !checkout.isFinalized) {
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkOutItem,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });

            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();

            await checkout.save();
            await Cart.findOneAndDelete({ user: checkout.user });

            return res.status(201).json(finalOrder);
        } else if (checkout.isFinalized) {
            return res.status(400).json({ message: "Checkout already finalized" });
        } else {
            return res.status(400).json({ message: "Checkout is not paid" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
