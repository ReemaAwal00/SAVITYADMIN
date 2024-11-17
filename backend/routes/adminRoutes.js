const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

// GET endpoint to fetch admin credentials
router.get('/', adminController.getAllAdmins);


module.exports = router;
