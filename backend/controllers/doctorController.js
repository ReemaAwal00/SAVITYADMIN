const doctorModel = require('../models/doctorModel');
const { insertDoctor } = require('../models/doctorModel');

// Controller function to handle fetching all admin credentials
const getAllDoctors = async (req, res) => {
  try {
    const doctor = await doctorModel.getAllDoctors();
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor data', error });
  }
};

// Controller function to add a doctor
const addDoctor = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email, and password are required' });
  }

  try {
    const newDoctor = await insertDoctor(name, email, password);
    res.status(201).json({
      message: 'Doctor added successfully',
      doctor: newDoctor,
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
