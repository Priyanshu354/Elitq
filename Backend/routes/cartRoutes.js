const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper function to get a cart by userId or guestId
const getCart = async (userId, guestId) => {
    if (userId) return await Cart.findOne({ user: userId });
    if (guestId) return await Cart.findOne({ guestId });
    return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged-in user
// @access Public
router.post("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    if (quantity <= 0) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await getCart(userId, guestId);

        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            );

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity
                });
            }

            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            console.log(userId, guestId);
            const newCart = await Cart.create({
                user: userId || undefined,
                guestId: guestId || "guest_" + Date.now(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity
                    }
                ],
                totalPrice: product.price * quantity
            });
            return res.status(200).json(newCart);
        }
    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// @route PUT /api/cart
// @desc Update product quantity in the cart
// @access Public
router.put("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        let cart = await getCart(userId, guestId);
        //console.log(cart);
        if (!cart) return res.status(404).json({ message: "Cart Not Found" });

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId && p.size === size && p.color === color
        );

        if (productIndex > -1) {
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.splice(productIndex, 1);
            }

            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product Not Found" });
        }
    } catch (error) {
        console.error("Update cart error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// @route DELETE /api/cart
// @desc Remove a product from cart
// @access Public
router.delete("/", async (req, res) => {
    const { productId, size, color, guestId, userId } = req.body;

    try {
        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart Not Found" });

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId && p.size === size && p.color === color
        );

        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product Not Found" });
        }
    } catch (error) {
        console.error("Delete cart error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// @route GET /api/cart
// @desc Get user's or guest's cart
// @access Public
router.get("/", async (req, res) => {
    const { guestId, userId } = req.query;

    try {
        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart Not Found" });
        return res.json(cart);
    } catch (error) {
        console.error("Get cart error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private
router.post("/merge", protect, async (req, res) => {
    const { guestId } = req.body;

    try {
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id });

        if (guestCart) {
            if (guestCart.products.length === 0) {
                return res.status(400).json({ message: "Guest cart is empty" });
            }

            if (userCart) {
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex(
                        (item) =>
                            item.productId.toString() === guestItem.productId.toString() &&
                            item.size === guestItem.size &&
                            item.color === guestItem.color
                    );

                    if (productIndex > -1) {
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    } else {
                        userCart.products.push(guestItem);
                    }
                });

                userCart.totalPrice = userCart.products.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                );

                await userCart.save();
                await Cart.findOneAndDelete({ guestId });

                return res.status(200).json(userCart);
            } else {
                guestCart.user = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save();
                return res.status(200).json(guestCart);
            }
        } else {
            if (userCart) return res.status(200).json(userCart);
            return res.status(404).json({ message: "Guest cart not found" });
        }
    } catch (error) {
        console.error("Merge cart error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
 