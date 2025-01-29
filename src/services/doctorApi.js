import axios from "axios";

const BASE_URL = 'http://localhost:5000/doctors';

export const getAllDoctors = () => {
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


// Insert a new doctor (sign up)
export const insertAllDoctors = (doctorData) => {
    return new Promise((resolve, reject) => {
      axios.post(BASE_URL, doctorData)
        .then((res) => {
          resolve(res.data); // The response can be customized based on the API response
        })
        .catch((err) => {
          reject(err); // Propagate the error for further handling
        });
    });
  };

  export const updateDoctor = (doctorId, doctorData) => {
    return new Promise((resolve, reject) => {
      axios.put(`${BASE_URL}/${doctorId}`, doctorData)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  export const deleteDoctor = (doctorId) => {
    return new Promise((resolve, reject) => {
      axios.delete(`${BASE_URL}/${doctorId}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
