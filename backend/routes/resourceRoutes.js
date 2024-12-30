const express = require('express');
const resourceController = require('../controllers/resourceController');
const { addResource, updateResourceController } = require('../controllers/resourceController'); // Import the update controller

const router = express.Router();

// GET endpoint to fetch all resources
router.get('/', resourceController.getAllResources);

// POST endpoint to add a new resource
router.post('/', resourceController.addResource);

// PUT endpoint to update an existing resource by id
router.put('/:id', updateResourceController); // Update route

module.exports = router;
