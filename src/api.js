import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://goit-project-02-back-end.onrender.com/',
});

export const setToken = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem('token', token);

  console.log('Токен установлен в заголовок и localStorage:', token);
};

export const clearToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers.common.Authorization = ``;
    localStorage.removeItem('token');

    console.log('Токен удален из localStorage и Redux');
  }
};

// Добавление токена к каждому запросу
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    console.log('Interceptor добавил заголовок с токеном:', token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(
        'Interceptor добавил заголовок:',
        config.headers.Authorization
      ); // Логирование заголовка
    }
    return config;
  },
  error => {
    // console.error('Ошибка в Interceptor:', error);
    return Promise.reject(error);
  }
);
