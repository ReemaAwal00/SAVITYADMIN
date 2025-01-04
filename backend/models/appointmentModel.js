const pool = require('../db');

// Function to get all appointments
const getAllAppointments = async () => {
  const query = `
    SELECT 
      id, patient_name, email, schedule_date, 
      schedule_time, contact, status, doctor_id, user_id
    FROM appointments;
  `;
  const result = await pool.query(query);
  return result.rows; // Returns an array of appointment records
};

// Function to insert a new appointment
const insertAppointment = async (
  patientName, email, scheduleDate, scheduleTime, contact, doctorId, userId
) => {
  try {
    const appointmentId = require('uuid').v4(); // Generate a UUID for appointment ID
    const query = `
      INSERT INTO appointments 
      (id, patient_name, email, schedule_date, schedule_time, contact, doctor_id, user_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *;
    `;
    const values = [appointmentId, patientName, email, scheduleDate, scheduleTime, contact, doctorId, userId];

    const result = await pool.query(query, values);
    return result.rows[0]; // Return the inserted appointment data
  } catch (error) {
    throw new Error('Error inserting appointment: ' + error.message);
  }
};

module.exports = {
  getAllAppointments,
  insertAppointment,
};
