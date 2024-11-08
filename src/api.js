import axios from "axios";

export const api = axios.create({
  baseURL: "https://goit-project-02-back-end.onrender.com/",
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem('token', token);
};

export const clearToken = () => {
  api.defaults.headers.common.Authorization = ``;
};
