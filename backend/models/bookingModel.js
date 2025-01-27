const pool = require('../db');
const { v4: uuidv4 } = require('uuid');

// Function to get all bookings
const getAllBookings = async () => {
  const query = 'SELECT id, schedule_date, schedule_time, doctor_id FROM booking';
  const result = await pool.query(query);
  return result.rows; // Returns an array of booking records
};

// Function to insert a new booking
const insertBooking = async (scheduleDate, scheduleTime, doctorId) => {
  try {
    const bookingId = uuidv4(); // Generate a UUID for booking id
    const query = `
      INSERT INTO booking (id, schedule_date, schedule_time, doctor_id)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [bookingId, scheduleDate, scheduleTime, doctorId];
  
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the inserted booking data
  } catch (error) {
    throw new Error('Error inserting booking: ' + error.message);
  }
};

module.exports = {
  getAllBookings,
  insertBooking,
};
