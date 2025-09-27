const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:True
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
})

module.exports = mongoose.model("category",categorySchema)