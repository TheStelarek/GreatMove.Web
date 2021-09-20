import { apiClient } from '@/api/apiClient';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface IsAvailableData {
  username?: string;
  email?: string;
}

export const isAvailableEmailUsername = createAsyncThunk<
  string,
  IsAvailableData,
  {
    rejectValue: string;
  }
>(
  `auth/isAvailableEmailUsername`,
  async ({ username, email }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/auth/available`, {
        username,
        email,
      });

      if (response.status === 200) {
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
  },
);
