const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: True
    },
    description:{
        type: String
    },
    price: {
        type: Number,
        required: True
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: True
    },
    shopkeeper: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: True
    },
    img: {
        type: String,
    }
})


module.exports = mongoose.model("product", productSchema)
