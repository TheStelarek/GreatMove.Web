import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiClient } from '@/api/apiClient';
import { Recipe } from '@/features/recipe/utils/types/Recipe';

interface GetMoreRecipesData {
   name?: string;
   caloriesRange?: number[];
   proteinsRange?: number[];
   carbsRange?: number[];
   fatsRange?: number[];
   time?: number;
   meals?: string[];
   tags?: string[];
   diets?: string[];
   take?: number;
   skip?: number;
}

interface GetMoreRecipesResponse {
   data: Array<Recipe>;
}

export const getMoreRecipes = createAsyncThunk<
   GetMoreRecipesResponse,
   GetMoreRecipesData,
   {
      rejectValue: string;
   }
>(
   `recipes/getMoreRecipes`,
   async (
      { name, caloriesRange, proteinsRange, carbsRange, fatsRange, time, meals, diets, tags, take, skip },
      { rejectWithValue },
   ) => {
      try {
         let link = `/recipes?`;
         if (name) link += `name=${name}`;
         if (caloriesRange && caloriesRange.length === 2) link += `&caloriesRange=${caloriesRange}`;
         if (proteinsRange && proteinsRange.length === 2) link += `&proteinsRange=${proteinsRange}`;
         if (carbsRange && carbsRange.length === 2) link += `&carbsRange=${carbsRange}`;
         if (fatsRange && fatsRange.length === 2) link += `&fatsRange=${fatsRange}`;
         if (time) link += `&time=${time}`;
         if (meals && meals.length > 0) link += `&meals=${meals}`;
         if (diets && diets.length > 0) link += `&diets=${diets}`;
         if (tags && tags.length > 0) link += `&tags=${tags}`;
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
   },
);
