const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // <-- 1. Import bcrypt

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // <-- ADDED
    },
    phoneNumber: {
        type: String,     // <-- CHANGED: Switched to String for correctness
        required: true,
        unique: true      // <-- ADDED: Ensures no two users share a phone number
    },
    shopName: {
        type: String,
        required: true,
        trim: true // <-- ADDED
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        trim: true // <-- ADDED
    },
    shopImage: {
        type: String // Optional
    },
    imagePublicId: {
        type: String // <-- CHANGED: Now optional to match shopImage
    }
}, { timestamps: true });

module.exports = mongoose.model("user",userSchema)
