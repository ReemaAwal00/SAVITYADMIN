const express = require('express');
const volunteerController = require('../controllers/volunteerController');


const router = express.Router();

// GET endpoint to fetch admin credentials
router.post('/', volunteerController.addVolunteer);
router.get('/', volunteerController.getAllVolunteers);


module.exports = router;
