const volunteerModel = require('../models/volunteerModel');
const { insertVolunteers } = require('../models/volunteerModel');
// const { getAllVolunteers } = require('../models/volunteerModel');


const getAllVolunteers = async (req, res) => {
    try {
      const user = await volunteerModel.getAllVolunteers();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching admin data', error });
    }
  };

// Controller function to add a doctor
const addVolunteer = async (req, res) => {
  const { vname, vdescription, vemail, vcontact } = req.body;

  if (!vname || !vdescription || !vemail || !vcontact) {
    return res.status(400).json({ error: 'name, description, email, and contact are required' });
  }

  try {
    const newUser = await insertVolunteers(vname, vdescription, vemail, vcontact);
    res.status(201).json({
      message: 'Volunteer added successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error adding User:', error.message);
    res.status(500).json({ error: 'An error occurred while adding the User' });
  }
};

module.exports = {
  addVolunteer,
  getAllVolunteers,
};
