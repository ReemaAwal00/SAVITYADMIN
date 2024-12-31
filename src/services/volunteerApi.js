import axios from "axios";

const BASE_URL = 'http://localhost:5000/volunteers';

export const getAllVolunteers = async () => {
    try {
      const response = await axios.get(BASE_URL); // fetch data from the API
      return response.data; // return the data from the response
    } catch (error) {
      console.error("Error fetching volunteers:", error);
      throw error; // throw the error so that it can be handled in the component
    }
  };

export const insertVolunteer = (volunteerData) => {
  return new Promise((resolve, reject) => {
    axios.post(BASE_URL, volunteerData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
