const Category = require("../Models/category");

exports.getCategory = async (req, res) => {
  try {
    const data = await Category.find();
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const data = await Category.create(req.body);
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const data = await Category.findByIdAndUpdate(req.params.id,req.body,{new:true});
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const data = await User.findByIdAndDelete(req.params.id)
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};
