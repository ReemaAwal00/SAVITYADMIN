const express = require('express');
const bookingController = require('../controllers/bookingController');
const { addBooking} = require('../controllers/bookingController');

const router = express.Router();

// GET endpoint to fetch doctor credentials
router.get('/', bookingController.getAllBooking);
router.post('/', bookingController.addBooking);
router.get('/doctor/:doctorId', bookingController.getBookingsByDoctorId);


module.exports = router;