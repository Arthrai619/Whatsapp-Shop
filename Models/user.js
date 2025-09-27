const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    shopName:{
        type:Number,
        required:true 
    },
    password:{
        type:Number,
        required:true
    },
    location:{
        type:String
    },
    shopImage:{
        type:String
    }
},{timestamps:true})


module.exports = mongoose.model("user",userSchema)