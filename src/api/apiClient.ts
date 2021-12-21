import axios from 'axios';

export const apiClient = axios.create({
   baseURL: `https://greatmove-app.herokuapp.com/api/v1`,
   withCredentials: true,
});
