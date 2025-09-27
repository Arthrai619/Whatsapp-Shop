const Product = require("../Models/product");
const cloudinary = require('cloudinary').v2;

exports.getProduct = async (req, res) => {
  try {
    const data = await Product.find();
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const data = await Product.create(req.body);
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
    try {
       
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

   
        await cloudinary.uploader.destroy(product.imagePublicId);

    
        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({ 
            success: true,
            message: "Product and associated image deleted successfully." 
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error while deleting product.' });
    }
};

exports.uploadImageController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false,
                message: 'No file was uploaded.' 
            });
        }

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'whatsapp-shop-products',
        });

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully!',
            imageUrl: result.secure_url,
            imagePublicId: result.public_id // FIX: Corrected property name
        });
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong during the upload.',
            error: error.message
        });
    }
};



