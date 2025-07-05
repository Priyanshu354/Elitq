const express = require("express");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");
const { overwriteMiddlewareResult } = require("mongoose");

const router = express.Router();

// @route   GET /api/admin/orders
// @desc    Get all orders (Admin only)
// @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
    try {
        let orders = await Order.find({}).populate("user", "name email");
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


// @route PUT /api/admin/orders/:id
// @desc Update order status
// @access Private/Admin
router.put("/:id", protect , admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if(order) {
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredA;

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        }
        else{
            return  res.status(404).json({message : "Order not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


// @route DELETE /api/admin/orders/:id
// @desc delete a order
// access private Admin
router.delete("/:id", protect , admin, async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "order not found" });
        }

        await order.deleteOne();
        res.json({message : "order deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
})
module.exports = router;
