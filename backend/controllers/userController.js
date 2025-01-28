const userModel = require('../models/userModel');
const { insertUsers, deleteUser } = require('../models/userModel'); // Import the deleteUser function

// Controller function to handle fetching all admin credentials
const getAllUsers = async (req, res) => {
  try {
    const user = await userModel.getAllUsers();
    res.status(200).json(user);
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

// Controller function to delete a user
const deleteUserController = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const deletedUser = await deleteUser(userId); // Call the deleteUser function
    res.status(200).json({
      message: 'User deleted successfully',
      user: deletedUser,
    });
  } catch (error) {
    console.error('Error deleting User:', error.message);
    if (error.message.includes('not found')) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(500).json({ error: 'An error occurred while deleting the User' });
    }
  }
};

module.exports = {
  getAllUsers,
  addUser,
  deleteUserController, // Export the deleteUserController function
};
