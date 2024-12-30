// doctorController.js
const { insertDoctor} = require('../models/doctorModel');
const doctorModel = require('../models/doctorModel');

// Controller function to handle fetching all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.getAllDoctors();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor data', error });
  }
};

// Controller function to add a doctor
const addDoctor = async (req, res) => {
  const { name, email, address, contact, hospital, password } = req.body;

  // Validate that all required fields are provided
  if (!name || !email || !address || !contact || !hospital || !password) {
    return res.status(400).json({ error: 'All fields (name, email, address, contact, hospital, password) are required' });
  }

  try {
    const newDoctorId = await insertDoctor(name, email, address, contact, hospital, password);
    res.status(201).json({
      message: 'Doctor added successfully',
      doctorId: newDoctorId, // Send back the ID of the new doctor
    });
  } catch (error) {
    console.error('Error adding doctor:', error.message);
    res.status(500).json({ error: 'An error occurred while adding the doctor' });
  }
};

module.exports = {
  getAllDoctors,
  addDoctor,
};
