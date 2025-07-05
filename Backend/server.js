const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoutes = require("./routes/subscriberRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes")

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

// Mongo DB connection 
connectDB();


app.get("/", (req, res) => {
    res.send("Welcome To Elitiq");
});


// API Routes
app.use("/api/users" , userRoutes);
app.use("/api/products" , productRoutes);
app.use("/api/cart" , cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/subscribe", subscribeRoutes);

//Admin
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
