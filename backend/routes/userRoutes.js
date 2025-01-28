const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// GET endpoint to fetch all users
router.get('/', userController.getAllUsers);

// POST endpoint to add a new user
router.post('/', userController.addUser);

// DELETE endpoint to delete a user by ID
router.delete('/:userId', userController.deleteUserController);

module.exports = router;
