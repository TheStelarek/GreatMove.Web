import { EnhancedStore } from '@reduxjs/toolkit';
import Router from 'next/router';
import { apiClient } from '@/api/apiClient';
import { reset, updateAccessToken } from '@/features/auth/store/AuthSlice';
import type { RootState } from '@/utils/types/RootState';

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
   failedQueue.forEach((prom: any) => {
      if (error) {
         prom.reject(error);
      } else {
         prom.resolve(token);
      }
   });

   failedQueue = [];
};

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
            if (isRefreshing) {
               return new Promise((resolve, reject) => {
                  failedQueue.push({ resolve, reject });
               })
                  .then((token) => {
                     originalRequest.headers.Authorization = `Bearer ${token}`;
                     return apiClient(originalRequest);
                  })
                  .catch((err) => Promise.reject(err));
            }

            // eslint-disable-next-line no-underscore-dangle
            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise((resolve, reject) => {
               apiClient
                  .post(`/auth/refresh-token`)
                  .then((res) => {
                     dispatch(updateAccessToken(res.data.accessToken));
                     originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
                     apiClient.defaults.headers.common.Authorization = `Bearer ${store.getState().auth.accessToken}`;
                     processQueue(null, res.data.accessToken);
                     resolve(apiClient(originalRequest));
                  })
                  .catch((err) => {
                     processQueue(err, null);
                     reject(err);
                  })
                  .finally(() => {
                     isRefreshing = false;
                  });
            });
         }

         return Promise.reject(error);
      },
   );
};

export default setup;
