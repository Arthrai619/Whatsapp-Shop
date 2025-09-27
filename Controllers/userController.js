const User = require("../Models/user");

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
    const data = await User.create(req.body);
    return res.json({ errors: false, data: data });
  } catch (error) {
    return res.status(500).json({ errors: true, message: error.message });
  }
};

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


