import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiClient } from '@/api/apiClient';
import { TrainingType } from '@/utils/types/TrainingType';

interface IsAvailableData {
   name: string;
   training: TrainingType;
}

export const saveTrainingPlan = createAsyncThunk<
   string,
   IsAvailableData,
   {
      rejectValue: string;
   }
>(`auth/isAvailableEmailUsername`, async ({ name, training }, { rejectWithValue }) => {
   try {
      const response = await apiClient.post(`/training-plans`, {
         name,
         trainingDays: Object.values(training),
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
});
