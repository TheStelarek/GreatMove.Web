import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiClient } from '@/api/apiClient';
import { Recipe } from '@/utils/types/Recipe';

interface GetRecipesData {
   name?: string;
   take?: number;
   skip?: number;
}

interface GetRecipesResponse {
   data: Array<Recipe>;
   total: number;
}

export const getRecipes = createAsyncThunk<
   GetRecipesResponse,
   GetRecipesData,
   {
      rejectValue: string;
   }
>(`recipes/getRecipes`, async ({ name, take, skip }, { rejectWithValue }) => {
   try {
      let link = `/recipes?`;
      if (name) link += `name=${name}`;
      if (take) link += `&take=${take}`;
      if (skip) link += `&skip=${skip}`;

      const response = await apiClient.get(link);

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
});
