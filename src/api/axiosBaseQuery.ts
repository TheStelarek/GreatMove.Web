import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosRequestConfig, AxiosError } from 'axios';
import { apiClient } from './apiClient';

export const axiosBaseQuery =
   (): BaseQueryFn<
      {
         url: string;
         method: AxiosRequestConfig['method'];
         data?: AxiosRequestConfig['data'];
      },
      unknown,
      unknown
   > =>
   async ({ url, method, data }) => {
      try {
         const result = await apiClient({ url, method, data });
         return { data: result.data };
      } catch (axiosError) {
         const err = axiosError as AxiosError;
         return {
            error: { status: err.response?.status, data: err.response?.data },
         };
      }
   };
