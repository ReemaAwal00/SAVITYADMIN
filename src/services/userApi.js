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
export const deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
      axios.delete(`${BASE_URL}/delete-user/${userId}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

