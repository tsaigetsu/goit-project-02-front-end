import axios from "axios";

export const api = axios.create({
  baseURL: "https://example.test/", // заменить потом
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  api.defaults.headers.common.Authorization = ``;
};
