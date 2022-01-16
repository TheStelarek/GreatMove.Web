import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiClient } from '@/api/apiClient';

export const getMe = createAsyncThunk(`auth/getMe`, async (_, { rejectWithValue }) => {
   try {
      const user = await apiClient.get(`/users/me`);

      return { user: user.data };
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
