const { insertResource } = require('../models/resourceModel');
const resourceModel = require('../models/resourceModel');
const { updateResource } = require('../models/resourceModel');

// Controller function to handle fetching all resources
const getAllResources = async (req, res) => {
  try {
    const resources = await resourceModel.getAllResources();
    res.status(200).json(resources); // Return all resources in the response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resource data', error });
  }
};

// Controller function to add a new resource
const addResource = async (req, res) => {
  const { title, description, video } = req.body;

  // Validate that all required fields are provided
  if (!title || !description || !video) {
    return res.status(400).json({ error: 'All fields (title, description, video) are required' });
  }

  try {
    const newResource = await insertResource(title, description, video);
    res.status(201).json({
      message: 'Resource added successfully',
      resource: newResource, // Send back the newly added resource data
    });
  } catch (error) {
    console.error('Error adding resource:', error.message);
    res.status(500).json({ error: 'An error occurred while adding the resource' });
  }
};

const updateResourceController = async (req, res) => {
    const { id } = req.params; // Get the resource ID from URL params
    const { title, description, video } = req.body; // Get data from request body
  
    try {
      // Call the update function from the model
      const updatedResource = await updateResource(id, title, description, video);
  
      // Return the updated resource
      return res.status(200).json({
        message: 'Resource updated successfully',
        resource: updatedResource,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        message: 'Error updating resource',
        error: error.message,
      });
    }
  };
  
module.exports = {
  getAllResources,
  addResource,
  updateResourceController,
};
