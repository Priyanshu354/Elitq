const express = require("express");
const User = require("../models/User");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   GET /api/admin/users
// @desc    Get all users (Admins only)
// @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route   POST /api/admin/users
// @desc    Add a new user (Admins only)
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        user = new User({
            name,
            email,
            password,
            role: role || "customer",
        });

        await user.save();
        res.status(200).json({ message: "User created successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route PUT /api/admin/users/:id
// @desc Update user info (admin Only) - Name , email, and role
// @access private Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;

        const updatedUser = await user.save();
        res.json({
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


// @route DELETE /api/admin/users/:id
// @desc delete a user
// access private Admin
router.delete("/:id", protect , admin, async(req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.deleteOne();
        res.json({message : "user deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
