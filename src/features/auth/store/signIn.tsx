import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '@/features/auth/utils/types/User';
import { apiClient } from '@/api/apiClient';

interface SignInUserData {
   username: string;
   password: string;
}

interface SignInResponse {
   user: User;
   accessToken: string;
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

      const user = await apiClient.get(`/users/me`);

      return { user: user.data, accessToken: response.data.accessToken };
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
