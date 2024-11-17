const userModel = require('../models/userModel');

// Controller function to handle fetching all admin credentials
const getAllUsers = async (req, res) => {
  try {
    const user = await userModel.getAllUsers();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin data', error });
  }
};

module.exports = {
  getAllUsers,
};
