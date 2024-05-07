import axios from "axios";

const BASE_URL = "https://social-web-platform-server.onrender.com/";

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

export const assetUrl = "https://social-web-platform-server.onrender.com/assets/";
