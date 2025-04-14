import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://goit-project-02-back-end.onrender.com/',
  withCredentials: true,
});

export const setToken = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem('token', token);
};

export const clearToken = () => {
  const token = localStorage.getItem('token');

  if (token) {
    api.defaults.headers.common.Authorization = '';
    localStorage.removeItem('token');
  }
};

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
