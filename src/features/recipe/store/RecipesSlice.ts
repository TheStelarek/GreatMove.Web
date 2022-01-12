import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/utils/types/RootState';
import { Recipe } from '@/features/recipe/utils/types/Recipe';
import { getRecipes } from '@/features/recipe/store/getRecipes';
import { getMoreRecipes } from '@/features/recipe/store/getMoreRecipes';
import { FilterValue } from '@/features/recipe/components/recipes/recipesFilterForm/filterData';

interface RecipesState {
   isFilterSearch: boolean;
   filteredRecipes: Recipe[];
   totalFilteredRecipes: number;
   filters?: FilterValue;
   hasMore: boolean;
   isFetching: boolean;
   isSuccess: boolean;
   isError: boolean;
   isEmpty: boolean;
   errorMessage: string | null | undefined;
}

const initialState: RecipesState = {
   isFilterSearch: false,
   filteredRecipes: [],
   totalFilteredRecipes: 0,
   filters: undefined,
   hasMore: false,
   isFetching: false,
   isSuccess: false,
   isError: false,
   isEmpty: false,
   errorMessage: null,
};

export const recipesSlice = createSlice({
   name: `recipes`,
   initialState,
   reducers: {
      clearState: () => initialState,
      clearStatuses: (state) => {
         state.isFetching = false;
         state.isSuccess = false;
         state.isError = false;
         state.isEmpty = false;
         state.errorMessage = null;
      },
      setFilters: (state, action: PayloadAction<FilterValue>) => {
         state.filters = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(getRecipes.fulfilled, (state: RecipesState, { payload: { data, total } }) => {
         state.isFetching = false;
         state.isSuccess = true;
         state.filteredRecipes = data;
         state.totalFilteredRecipes = total;
         state.hasMore = total > data.length;
         state.isEmpty = data.length === 0;
      });

      builder.addCase(getMoreRecipes.fulfilled, (state: RecipesState, { payload: { data } }) => {
         state.filteredRecipes = [...state.filteredRecipes, ...data];
         state.hasMore = state.totalFilteredRecipes > state.filteredRecipes.length;
      });

      builder.addCase(getRecipes.pending, (state: RecipesState) => {
         state.isFetching = true;
         state.isFilterSearch = true;
         state.isSuccess = false;
      });

      builder.addMatcher(isAnyOf(getRecipes.rejected, getMoreRecipes.rejected), (state: RecipesState, action) => {
         state.isFetching = false;
         state.isError = true;
         state.errorMessage = action.payload;
         state.errorMessage = action.payload ? action.payload : action.error.message;
      });
   },
});

export const { clearState, setFilters, clearStatuses } = recipesSlice.actions;
export const recipesSelector = (state: RootState) => state.recipes;
