const userModel = require('../models/userModel');
const { insertUsers, deleteUser } = require('../models/userModel');

// Controller function to handle fetching all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error });
  }
};

// Controller function to add a user
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

// Controller function to delete a user by user_id
const deleteUserController = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const deletedUser = await deleteUser(userId);
    res.status(200).json({
      message: 'User deleted successfully',
      deletedUser,
    });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  deleteUserController,
};
