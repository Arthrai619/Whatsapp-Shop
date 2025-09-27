const Product = require("../Models/product");

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
    const data = await User.findByIdAndDelete(req.params.id)
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};


