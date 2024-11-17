const pool = require('../db');

// Function to get all admin credentials
const getAllAdmins = async () => {
  const query = 'SELECT username, password FROM admin';
  const result = await pool.query(query);
  return result.rows; // Returns an array of admin records
};

module.exports = {
  getAllAdmins,
};
