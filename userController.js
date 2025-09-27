const User = require("../Models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.getUser = async (req, res) => {
  try {
    const data = await User.find();
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const userExists = await User.findOne({phoneNumber:req.body.phoneNumber})
    if(userExists) return res.status(500).json({errors:true,message:"User already Exists"})
    req.body.password = await bcrypt.hash(req.body.password,10)
    const data = await User.create(req.body);
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.loginUser = async(req,res)=>{
    try {
     const userExists = await User.findOne({phoneNumber:req.body.phoneNumber})   
     if(!userExists) return res.status(500).json({errors:true,message:"Phone number or password is invalid"})
     const comparePass = bcrypt.compare(req.body.password,userExists.password)
     if(!comparePass) return res.status(500).json({errors:true,message:"Phone number or password is invalid"})
     const token = await jwt.sign({id:userExists._id},process.env.SEC)
    return res.json({errors:false,data:{token:token,user:userExists}})
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
}

exports.updateUser = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const data = await User.findByIdAndDelete(req.params.id)
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};


