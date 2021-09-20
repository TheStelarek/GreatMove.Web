import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { RootState } from '@/store/index';
import { signUpUser } from './signUpUser';
import { isAvailableEmailUsername } from './isAvailableEmailUsername';

interface AuthState {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string | null | undefined;
}

const initialState: AuthState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: `auth`,
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = null;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(signUpUser.fulfilled, isAvailableEmailUsername.fulfilled),
      (state: AuthState) => {
        state.isFetching = false;
        state.isSuccess = true;
      },
    );

    builder.addMatcher(
      isAnyOf(signUpUser.pending, isAvailableEmailUsername.pending),
      (state: AuthState) => {
        state.isFetching = true;
      },
    );

    builder.addMatcher(
      isAnyOf(signUpUser.rejected, isAvailableEmailUsername.rejected),
      (state: AuthState, action) => {
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

export const { clearState } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
