const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // <-- ADDED
    },
    description: {
        type: String,
        trim: true // <-- ADDED
    },
    price: {
        type: Number,
        required: true,
        min: 0 // <-- ADDED: Prevents negative prices
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    shopkeeper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    imageUrl: { // <-- RENAMED from 'img' for clarity
        type: String,
        
    },
    imagePublicId: {
        type: String,

    }
}, {
    timestamps: true // <-- ADDED
});

module.exports = mongoose.model("product", productSchema);
