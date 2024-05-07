import axios from "axios";

const BASE_URL = "http://localhost:5000/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = (token) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const assetUrl = "http://localhost:5000/assets/"
