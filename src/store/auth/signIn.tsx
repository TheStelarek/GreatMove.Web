import { setAccessToken } from '@/api/accessToken';
import { apiClient } from '@/api/apiClient';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface SignInUserData {
   username: string;
   password: string;
}

interface SignInResponse {
   user: {
      email: string;
   };
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

      setAccessToken(response.data.accessToken);
      const user = await apiClient.get(`/users/me`);

      return { user: user.data.user };
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
