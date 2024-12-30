const pool = require('../db');
const { v4: uuidv4 } = require('uuid'); // Import UUID v4 function

// Function to get all resources
const getAllResources = async () => {
  const query = 'SELECT  id, title, description, video FROM resource';
  const result = await pool.query(query);
  return result.rows; // Returns an array of resource records
};

// Function to insert a new resource
const insertResource = async (title, description, video) => {
  try {
    const resourceId = uuidv4(); // Generate a UUID for id
    const query = `
      INSERT INTO resource (id, title, description, video) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *`;
    const values = [resourceId, title, description, video];

    const result = await pool.query(query, values);
    return result.rows[0]; // Return the inserted resource data
  } catch (error) {
    throw new Error('Error inserting resource: ' + error.message);
  }
};

const updateResource = async (id, title, description, video) => {
    try {
      // SQL query to update the resource in the database
      const query = `
        UPDATE resource 
        SET title = $1, description = $2, video = $3 
        WHERE id = $4 
        RETURNING *;
      `;
      const values = [title, description, video, id];
  
      const result = await pool.query(query, values);
  
      // If no rows are updated, the resource ID was not found
      if (result.rowCount === 0) {
        throw new Error('Resource not found');
      }
  
      return result.rows[0]; // Return the updated resource data
    } catch (error) {
      throw new Error('Error updating resource: ' + error.message);
    }
  };

module.exports = {
  getAllResources,
  insertResource,
  updateResource,
};
