import { apiClient } from '@/api/apiClient';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface SignInUserData {
   username: string;
   password: string;
}

interface SignInResponse {
   user: {
      roles: Array<string>;
   };
   token: string;
}

export const signIn = createAsyncThunk<
   SignInResponse,
   SignInUserData,
   {
      rejectValue: string;
   }
>(`auth/signIn`, async ({ username, password }, { rejectWithValue }) => {
   try {
      const response = await apiClient.post(`/auth/login`, {
         username,
         password,
      });

      if (response.status === 200) {
         localStorage.setItem(`token`, response.data.token);
         return response.data;
      }

      return rejectWithValue(response.data.message);
   } catch (err) {
      if (axios.isAxiosError(err)) {
         if (!err.response) {
            throw err;
         }

         return rejectWithValue(err.response?.data.message);
      }

      return rejectWithValue(`Something went wrong.`);
   }
});
