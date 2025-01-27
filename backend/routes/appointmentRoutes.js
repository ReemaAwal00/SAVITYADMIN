const express = require('express');
const appointmentController = require('../controllers/appointmentController');

const router = express.Router();

// GET endpoint to fetch all appointments
router.get('/', appointmentController.getAllAppointments);

// POST endpoint to add a new appointment
router.post('/', appointmentController.addAppointment);

module.exports = router;
