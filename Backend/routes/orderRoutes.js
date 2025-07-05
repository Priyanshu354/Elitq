const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/orders/my-orders
// @desc Get logged_in user's orders
// @access private
router.get("/my-orders", protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({
            createdAt: -1,
        });

        res.json(orders);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route GET /api/orders/my-orders/:id
// @desc Get order details by ID
// @access private
router.get("/my-orders/:id", protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");

        // If the order is not found
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
