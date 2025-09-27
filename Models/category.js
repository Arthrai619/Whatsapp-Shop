const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // <-- ADDED: Removes whitespace from both ends
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true // <-- ADDED: Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model("category", categorySchema);
