import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { RootState } from '@/store/index';
import { signUpUser } from './signUpUser';
import { isAvailableEmailUsername } from './isAvailableEmailUsername';
import { signIn } from './signIn';

interface AuthState {
  isLoggedIn: boolean;
  roles: Array<string>;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string | null | undefined;
}

const initialState: AuthState = {
  isLoggedIn: false,
  roles: [],
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
    builder.addCase(
      signIn.fulfilled,
      (state: AuthState, { payload: { user } }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.roles = user.roles;
      },
    );

    builder.addMatcher(
      isAnyOf(signUpUser.fulfilled, isAvailableEmailUsername.fulfilled),
      (state: AuthState) => {
        state.isFetching = false;
        state.isSuccess = true;
      },
    );

    builder.addMatcher(
      isAnyOf(
        signUpUser.pending,
        isAvailableEmailUsername.pending,
        signIn.pending,
      ),
      (state: AuthState) => {
        state.isFetching = true;
      },
    );

    builder.addMatcher(
      isAnyOf(
        signUpUser.rejected,
        isAvailableEmailUsername.rejected,
        signIn.rejected,
      ),
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
