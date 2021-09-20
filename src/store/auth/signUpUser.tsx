import { apiClient } from '@/api/apiClient';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface SignUpUserData {
  username: string;
  email: string;
  password: string;
}

export const signUpUser = createAsyncThunk<
  string,
  SignUpUserData,
  {
    rejectValue: string;
  }
>(
  `auth/signUpUser`,
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/auth/register`, {
        username,
        email,
        password,
      });

      if (response.status === 201) {
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
