const pool = require('../db');

// Function to get all users
const getAllUsers = async () => {
  const query = 'SELECT user_id, username, email, password FROM users';
  const result = await pool.query(query);
  return result.rows; // Returns an array of user records
};

// Function to insert a user
const insertUsers = async (username, email, password) => {
  try {
    const userId = require('uuid').v4(); // Generate a UUID for user
    const query = `INSERT INTO users (user_id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [userId, username, email, password];

    const result = await pool.query(query, values);
    return result.rows[0]; // Return the inserted user data
  } catch (error) {
    throw new Error('Error inserting user: ' + error.message);
  }
};

// Function to delete a user by user_id
const deleteUser = async (userId) => {
  try {
    const query = 'DELETE FROM users WHERE user_id = $1 RETURNING *';
    const values = [userId];

    const result = await pool.query(query, values);
    
    // Check if the user was deleted
    if (result.rowCount === 0) {
      throw new Error('User not found');
    }

    return result.rows[0]; // Return the deleted user data
  } catch (error) {
    throw new Error('Error deleting user: ' + error.message);
  }
};

module.exports = {
  getAllUsers,
  insertUsers,
  deleteUser,
};
