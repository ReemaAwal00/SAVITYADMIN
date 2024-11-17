const adminModel = require('../models/adminModel');

// Controller function to handle fetching all admin credentials
const getAllAdmins = async (req, res) => {
  try {
    const admins = await adminModel.getAllAdmins();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin data', error });
  }
};

module.exports = {
  getAllAdmins,
};
