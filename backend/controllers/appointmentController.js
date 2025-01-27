const { use } = require('react');
const appointmentModel = require('../models/appointmentModel');

// Controller function to fetch all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

// Controller function to add an appointment
const addAppointment = async (req, res) => {
  const { 
    patientName, email, scheduleDate, 
    scheduleTime, contact, doctorId
  } = req.body;

  if (!patientName  || !email || !scheduleDate || !scheduleTime || !contact ||  !doctorId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newAppointment = await appointmentModel.insertAppointment(
      patientName, email, scheduleDate, scheduleTime, contact, doctorId
    );
    res.status(201).json({
      message: 'Appointment added successfully',
      appointment: newAppointment,
    });
  } catch (error) {
    console.error('Error adding appointment:', error.message);
    res.status(500).json({ error: 'An error occurred while adding the appointment' });
  }
};

module.exports = {
  getAllAppointments,
  addAppointment,
};
