import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/index';
import { Recipe } from '@/utils/types/Recipe';
import { getRecipes } from './getRecipes';
import { getMoreRecipes } from './getMoreRecipes';

interface RecipesState {
  filteredRecipes: Recipe[];
  totalFilteredRecipes: number;
  filterSearch: boolean;
  hasMore: boolean;
  searchName: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  isEmpty: boolean;
  errorMessage: string | null | undefined;
}

const initialState: RecipesState = {
  hasMore: false,
  filterSearch: false,
  totalFilteredRecipes: 0,
  searchName: ``,
  filteredRecipes: [],
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
    clearState: (state) => {
      state.hasMore = false;
      state.filterSearch = false;
      state.totalFilteredRecipes = 0;
      state.filteredRecipes = [];
      state.searchName = ``;
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.isEmpty = false;
      state.errorMessage = null;
    },
    setSearchName: (state, action: PayloadAction<string>) => {
      state.searchName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getRecipes.fulfilled,
      (state: RecipesState, { payload: { data, total } }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.filteredRecipes = data;
        state.totalFilteredRecipes = total;
        state.hasMore = total > data.length;
        state.isEmpty = data.length === 0;
      },
    );

    builder.addCase(
      getMoreRecipes.fulfilled,
      (state: RecipesState, { payload: { data } }) => {
        state.filteredRecipes = [...state.filteredRecipes, ...data];
        state.hasMore =
          state.totalFilteredRecipes > state.filteredRecipes.length;
      },
    );

    builder.addCase(getRecipes.pending, (state: RecipesState) => {
      state.isFetching = true;
      state.filterSearch = true;
      state.isSuccess = false;
    });

    builder.addMatcher(
      isAnyOf(getRecipes.rejected, getMoreRecipes.rejected),
      (state: RecipesState, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.errorMessage = action.payload
          ? action.payload
          : action.error.message;
      },
    );
  },
});

export const { clearState, setSearchName } = recipesSlice.actions;
export const recipesSelector = (state: RootState) => state.recipes;
