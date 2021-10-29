import axios from 'axios';

export const apiClient = axios.create({
   baseURL: `https://greatmove-app.herokuapp.com/api/v1`,
});

apiClient.interceptors.request.use(
   (config) => {
      if (typeof window !== `undefined`) {
         const token = localStorage.getItem(`token`);
         if (token) {
            config.headers.Authorization = `Bearer ${token}`;
         }
      }

      return config;
   },
   (error) => {
      Promise.reject(error);
   },
);
