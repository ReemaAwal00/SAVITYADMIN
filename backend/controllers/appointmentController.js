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
    scheduleTime, contact, doctorId , user_id

  } = req.body;

  if (!patientName  || !email || !scheduleDate || !scheduleTime || !contact ||  !doctorId || !user_id) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newAppointment = await appointmentModel.insertAppointment(
      patientName, email, scheduleDate, scheduleTime, contact, doctorId, user_id

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


// Controller function to fetch appointments by doctor ID
const getAppointmentsByDoctorId = async (req, res) => {
  const { doctorId } = req.params;

  if (!doctorId) {
    return res.status(400).json({ error: 'Doctor ID is required' });
  }

  try {
    const appointments = await appointmentModel.getAppointmentsByDoctorId(doctorId);
    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for the given doctor ID' });
    }
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments by doctor ID:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching appointments' });
  }
};

// Controller function to update appointment status
const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate input
  if (id == null || status == null) {
    return res.status(400).json({ error: "Appointment ID and status are required." });
  }

  // Ensure status is a boolean
  if (typeof status !== "boolean") {
    return res.status(400).json({ error: "Invalid status type. Must be true or false." });
  }

  try {
    const updatedAppointment = await appointmentModel.updateAppointmentStatus(id, status);

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found or could not be updated." });
    }

    return res.status(200).json({
      message: "Appointment status updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Error updating appointment status:", error.message);
    return res.status(500).json({ error: "An error occurred while updating appointment status." });
  }
};

module.exports = {
  getAllAppointments,
  addAppointment,
  getAppointmentsByDoctorId,
  updateAppointmentStatus,
};