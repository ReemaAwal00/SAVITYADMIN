const pool = require('../db');

// Function to get all doctor credentials
const getAllDoctors = async () => {
  const query = 'SELECT name, email, password, address, contact, hospital, doctor_id FROM doctors';
  const result = await pool.query(query);
  return result.rows; // Returns an array of doctor records
};

const insertDoctor = async (name, email, address, contact, hospital, password) => {
    try {
      const doctorId = require('uuid').v4(); // Generate a UUID for doctor_id
      const query = `INSERT INTO doctors (doctor_id, name, email, address, contact, hospital, password) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
      const values = [doctorId, name, email, address, contact, hospital, password];
  
      const result = await pool.query(query, values);
      return result.rows[0]; // Return the inserted doctor data
    } catch (error) {
      throw new Error('Error inserting doctor: ' + error.message);
    }
  };

module.exports = {
  getAllDoctors,
  insertDoctor,
};
