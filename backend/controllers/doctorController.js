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


const updateDoctor = async (req, res) => {
  const { doctor_id } = req.params;
  const requiredFields = ['name', 'email', 'address', 'contact', 'hospital', 'password'];

  if (!requiredFields.every(field => req.body[field])) {
    return res.status(400).json({ 
      error: 'All fields (name, email, address, contact, hospital, password) are required' 
    });
  }

  try {
    const updatedDoctor = await doctorModel.updateDoctor(doctor_id, req.body);
    
    if (!updatedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.status(200).json({
      message: 'Doctor updated successfully',
      doctor: updatedDoctor
    });
  } catch (error) {
    console.error('Error updating doctor:', error.message);
    res.status(500).json({ error: 'An error occurred while updating the doctor' });
  }
};

const deleteDoctor = async (req, res) => {
  const { doctor_id } = req.params;

  try {
    const deletedDoctor = await doctorModel.deleteDoctor(doctor_id);
    
    if (!deletedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.status(200).json({
      message: 'Doctor deleted successfully',
      doctor: deletedDoctor
    });
  } catch (error) {
    console.error('Error deleting doctor:', error.message);
    res.status(500).json({ error: 'An error occurred while deleting the doctor' });
  }
};

module.exports = {
  getAllDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor // Add this to exports


};
