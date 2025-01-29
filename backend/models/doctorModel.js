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

  // Update doctor by ID
const updateDoctor = async (doctorId, doctorData) => {
  try {
    const query = `UPDATE doctors 
                   SET name = $1, email = $2, address = $3, 
                       contact = $4, hospital = $5, password = $6
                   WHERE doctor_id = $7 RETURNING *`;
    const values = [
      doctorData.name,
      doctorData.email,
      doctorData.address,
      doctorData.contact,
      doctorData.hospital,
      doctorData.password,
      doctorId
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error('Error updating doctor: ' + error.message);
  }}


 // In doctorModel.js
const deleteDoctor = async (doctorId) => {
  try {
    // Delete related appointments first
    await pool.query('DELETE FROM appointments WHERE doctor_id = $1', [doctorId]);
    
    // Then delete the doctor
    const result = await pool.query(
      'DELETE FROM doctors WHERE doctor_id = $1 RETURNING *',
      [doctorId]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Error deleting doctor: ' + error.message);
  }
};
module.exports = {
  getAllDoctors,
  insertDoctor,
  updateDoctor,
  deleteDoctor // Add this to exports

};
