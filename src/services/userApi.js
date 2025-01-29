import axios from "axios";

const BASE_URL = 'http://localhost:5000/users';

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    axios.get(BASE_URL)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const insertAllUsers = (userData) => {
  return new Promise((resolve, reject) => {
    axios.post(BASE_URL, userData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Delete user

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
};
