const pool = require('../db');

// Function to get all admin credentials
const getAllUsers = async () => {
  const query = 'SELECT email, password FROM users';
  const result = await pool.query(query);
  return result.rows; // Returns an array of admin records
};

module.exports = {
  getAllUsers,
};
