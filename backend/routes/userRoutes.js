const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// GET endpoint to fetch admin credentials
router.get('/', userController.getAllUsers);


module.exports = router;
