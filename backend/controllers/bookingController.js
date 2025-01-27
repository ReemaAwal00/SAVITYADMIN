// bookingController.js
const { insertBooking, getAllBookings, getBookingsByDoctorId } = require('../models/bookingModel');

// Controller function to get bookings by doctor ID
const getBookingsByDoctorIdController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const bookings = await getBookingsByDoctorId(doctorId); // Correct function call
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving bookings by doctor ID',
      error: error.message
    });
  }
};
// Controller function to handle fetching all bookings
const getAllBooking = async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking data', error });
  }
};

// Controller function to add a new booking
const addBooking = async (req, res) => {
  const { scheduleDate, scheduleTime, doctorId } = req.body;

  // Validate that all required fields are provided
  if (!scheduleDate || !scheduleTime || !doctorId) {
    return res.status(400).json({ error: 'All fields (scheduleDate, scheduleTime, doctorId) are required' });
  }

  try {
    const newBooking = await insertBooking(scheduleDate, scheduleTime, doctorId);
    res.status(201).json({
      message: 'Booking added successfully',
      booking: newBooking, // Send back the newly created booking
    });
  } catch (error) {
    console.error('Error adding booking:', error.message);
    res.status(500).json({ error: 'An error occurred while adding the booking' });
  }
};

// Controller function to get bookings by doctor ID

module.exports = {
  getAllBooking,
  addBooking,
  getBookingsByDoctorId: getBookingsByDoctorIdController

};
