const express = require('express');
const userController = require('../controllers/userController');


const router = express.Router();

// GET endpoint to fetch admin credentials
router.get('/', userController.getAllUsers);
router.post('/', userController.addUser);


module.exports = router;
