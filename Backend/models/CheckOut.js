const mongoose = require("mongoose");

const checkOutItemSchema = new mongoose.Schema({
    productId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    image: {
        type : String,
        required : true,
    },
    price: {
        type : Number,
        required : true,
    },
    size : {
        type: String,
        required: true,
    },
    color: {
        type : String,
        required: true,
    },
    quantity: {
        type : Number,
        require: true,
    }

},
    {_id: false});

const checkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    checkOutItem : [checkOutItemSchema],
    shippingAddress : {
        address: {type: String, required: true},
        city : {type: String, required: true},
        postalCode: {type: String, required: true},
        country: {type: String, required: true},
    },
    paymentMethod: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    isPaid : {
        type: Boolean,
        default: false,
    },
    isFinalized: {
        type: Boolean,
        default: false,
    },
    paidAt : {
        type: Date,
    },
    paymentStatus: {
        type: String,
        default: "Pending",
    },
    paymentDetails: {
        type: Object,
        default: {},
    },
    finalizedAt: {
        type: Date,
    }
}, {timestamps: true});

module.exports = mongoose.model("Checkout", checkoutSchema);