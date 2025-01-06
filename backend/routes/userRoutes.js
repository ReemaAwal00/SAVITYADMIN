const express = require('express');
const userController = require('../controllers/userController');



const router = express.Router();

// GET endpoint to fetch admin credentials
router.get('/', userController.getAllUsers);
router.post('/', userController.addUser);

// Route to delete a user by userId
router.delete('/delete-user/:userId',userController.deleteUserController);


module.exports = router;
