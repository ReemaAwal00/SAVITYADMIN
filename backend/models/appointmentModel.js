const pool = require('../db');

// Function to get all appointments
const getAllAppointments = async () => {
  const query = `
    SELECT 
      id, patient_name, email, schedule_date, 
      schedule_time, contact, status, doctor_id 
    FROM appointments;
  `;
  const result = await pool.query(query);
  return result.rows; // Returns an array of appointment records
};

// Function to insert a new appointment
const insertAppointment = async (
  patientName, email, scheduleDate, scheduleTime, contact, doctorId
) => {
  try {
    const appointmentId = require('uuid').v4(); // Generate a UUID for appointment ID
    const query = `
      INSERT INTO appointments 
      (id, patient_name, email, schedule_date, schedule_time, contact, doctor_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *;
    `;
    const values = [appointmentId, patientName, email, scheduleDate, scheduleTime, contact, doctorId];

    const result = await pool.query(query, values);
    return result.rows[0]; // Return the inserted appointment data
  } catch (error) {
    throw new Error('Error inserting appointment: ' + error.message);
  }
};

// Function to get an appointment by ID
const getAppointmentsByDoctorId = async (doctorId) => {
  try {
    const query = `
      SELECT 
        id, patient_name, email, schedule_date, 
        schedule_time, contact, status, doctor_id 
      FROM appointments 
      WHERE doctor_id = $1;
    `;
    const values = [doctorId];
    const result = await pool.query(query, values);
    return result.rows; // Return an array of appointments for the doctor
  } catch (error) {
    throw new Error('Error fetching appointments by doctor ID: ' + error.message);
  }
};


// Function to update the status of an appointment
const updateAppointmentStatus = async (id, status) => {
  try {
    const query = `
      UPDATE appointments 
      SET status = $1 
      WHERE id = $2 
      RETURNING *;
    `;
    const values = [status, id];
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the updated appointment record
  } catch (error) {
    throw new Error('Error updating appointment status: ' + error.message);
  }
};

module.exports = {
  getAllAppointments,
  insertAppointment,
  getAppointmentsByDoctorId,
  updateAppointmentStatus,
};

