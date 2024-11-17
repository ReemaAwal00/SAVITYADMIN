import axios from "axios";

const BASE_URL = 'http://localhost:5000/admins';

export const getAllAdmins = () => {
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
