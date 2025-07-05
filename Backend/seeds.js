const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../Backend/models/User");
const Product = require("../Backend/models/Product");
const Cart = require("../Backend/models/Cart");
const products = require("../Backend/data/products");

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

// Function to seed Data
const seedData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // create a default admin User
        const createdUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
        });

        // Assign the default userId to each Product
        const userID = createdUser._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: userID }; // make sure this matches your schema
        });

        // Insert the products into the database
        await Product.insertMany(sampleProducts);

        console.log("🌱 Product Data Seeded Successfully");
        process.exit();
    } catch (error) {
        console.log("❌ Error seeding the data", error);
        process.exit(1);
    }
};

seedData();
