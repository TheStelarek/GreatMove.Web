import { reset, updateAccessToken } from '@/store/auth/AuthSlice';
import type { RootState } from '@/utils/types/RootState';
import { EnhancedStore } from '@reduxjs/toolkit';
import Router from 'next/router';
import { apiClient } from './apiClient';

const setup = (store: EnhancedStore<RootState>) => {
   const { dispatch } = store;

   apiClient.interceptors.request.use(
      (config) => {
         const token = store.getState().auth.accessToken;
         if (token) {
            config.headers.Authorization = `Bearer ${token}`;
         }
         return config;
      },
      (error) => {
         Promise.reject(error);
      },
   );

   apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
         const originalRequest = error.config;

         if (
            originalRequest.url === `/auth/refresh-token` &&
            (error.response.status === 400 || error.response.status === 401)
         ) {
            Router.push(`/login`);
            dispatch(reset());
            return Promise.reject(error);
         }

         // eslint-disable-next-line no-underscore-dangle
         if (error.response.status === 401 && !originalRequest._retry) {
            // eslint-disable-next-line no-underscore-dangle
            originalRequest._retry = true;
            return apiClient.post(`/auth/refresh-token`).then((res) => {
               dispatch(updateAccessToken(res.data.accessToken));
               apiClient.defaults.headers.common.Authorization = `Bearer ${store.getState().auth.accessToken}`;
               return apiClient(originalRequest);
            });
         }
         return Promise.reject(error);
      },
   );
};

export default setup;
