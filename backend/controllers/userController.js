const userModel = require('../models/userModel');
const { insertUsers } = require('../models/userModel');

// Controller function to handle fetching all admin credentials
const getAllUsers = async (req, res) => {
  try {
    const user = await userModel.getAllUsers();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error });
  }
};


// Controller function to add a doctor
const addUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'username, email, and password are required' });
  }

  try {
    const newUser = await insertUsers(username, email, password);
    res.status(201).json({
      message: 'User added successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error adding User:', error.message);
    res.status(500).json({ error: 'An error occurred while adding the User' });
  }
};

module.exports = {
  getAllUsers,
  addUser,
};
