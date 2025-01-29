const express = require('express');
const doctorController = require('../controllers/doctorController');
const { addDoctor} = require('../controllers/doctorController');

const router = express.Router();

// GET endpoint to fetch doctor credentials
router.get('/', doctorController.getAllDoctors);
router.post('/', doctorController.addDoctor);

router.put('/:doctor_id', doctorController.updateDoctor);
router.delete('/:doctor_id', doctorController.deleteDoctor);

module.exports = router;
