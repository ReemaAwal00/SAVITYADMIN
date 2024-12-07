const pool = require('../db');

// Function to get all admin credentials
const getAllVolunteers = async () => {
  const query = 'SELECT vname, vdescription, vemail, vcontact FROM volunteer';
  const result = await pool.query(query);
  return result.rows; // Returns an array of admin records
};

const insertVolunteers = async (vname, vdescription, vemail, vcontact) => {
  try {
    const vId = require('uuid').v4(); // Generate a UUID for user
    const query = `INSERT INTO volunteer (vid, vname, vdescription, vemail, vcontact) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [vId, vname, vdescription, vemail, vcontact];

    const result = await pool.query(query, values);
    return result.rows[0]; // Return the inserted user data
  } catch (error) {
    throw new Error('Error inserting volunteers: ' + error.message);
  }
};

module.exports = {
  getAllVolunteers,
  insertVolunteers,
};
