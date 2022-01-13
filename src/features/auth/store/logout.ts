import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiClient } from '@/api/apiClient';

export const logout = createAsyncThunk(`auth/logout`, async (_, { rejectWithValue }) => {
   try {
      await apiClient.delete(`/auth/logout`);
      return true;
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
