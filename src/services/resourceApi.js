import axios from "axios";

const BASE_URL = 'http://localhost:5000/resources';

export const getAllResource = () => {
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

export const getResourceById = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const createResource = (resourceData) => {
  return new Promise((resolve, reject) => {
    axios.post(BASE_URL, resourceData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateResource = (id, resourceData) => {
  return new Promise((resolve, reject) => {
    axios.put(`${BASE_URL}/${id}`, resourceData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteResource = (id) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${BASE_URL}/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
