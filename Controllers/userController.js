const User = require("../Models/user");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cloudinary = require('cloudinary').v2;

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
     const comparePass = await bcrypt.compare(req.body.password,userExists.password)
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




exports.updateShopImageController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }
        const userId = req.user.id;
        
        // 1. Find the user to get the old image's public_id
        const user = await User.findById(userId);
        const oldPublicId = user.imagePublicId;

        // 2. Upload the new image
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const newImage = await cloudinary.uploader.upload(dataURI, {
            folder: 'whatsapp-shop-profiles',
        });

        // 3. Update the database with the NEW image details
        const updatedUser = await User.findByIdAndUpdate(userId, { 
            shopImage: newImage.secure_url,
            imagePublicId: newImage.public_id
        }, { new: true }).select('-password');

        // 4. If an old image existed, delete it from Cloudinary
        if (oldPublicId) {
            await cloudinary.uploader.destroy(oldPublicId);
        }

        res.status(200).json({
            success: true,
            message: 'Shop image updated successfully!',
            user: updatedUser,
        });
    } catch (error) {
        console.error('Error updating shop image:', error);
        res.status(500).json({ message: 'Server error while updating image.' });
    }
};






