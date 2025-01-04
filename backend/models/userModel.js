const pool = require('../db');

// Function to get all admin credentials
const getAllUsers = async () => {
  const query = 'SELECT user_id, username, email, password FROM users';
  const result = await pool.query(query);
  return result.rows; // Returns an array of admin records
};

const insertUsers = async (username, email, password) => {
  try {
    const userId = require('uuid').v4(); // Generate a UUID for user
    const query = `INSERT INTO users (user_id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [userId, username, email, password];

    const result = await pool.query(query, values);
    return result.rows[0]; // Return the inserted user data
  } catch (error) {
    throw new Error('Error inserting doctor: ' + error.message);
  }
};

module.exports = {
  getAllUsers,
  insertUsers,
};
