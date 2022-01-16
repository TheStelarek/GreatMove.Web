import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/utils/types/RootState';
import { User } from '@/features/auth/utils/types/User';
import { signUpUser } from './signUpUser';
import { isAvailableEmailUsername } from './isAvailableEmailUsername';
import { signIn } from './signIn';
import { logout } from './logout';
import { getMe } from './getMe';

interface AuthState {
   isLoggedIn: boolean;
   accessToken: string;
   me: User | null;
   isFetching: boolean;
   isSuccess: boolean;
   isError: boolean;
   errorMessage: string | null | undefined;
}

const initialState: AuthState = {
   isLoggedIn: false,
   accessToken: ``,
   me: null,
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
      },
      reset: () => initialState,
      updateAccessToken: (state, action: PayloadAction<string>) => {
         state.accessToken = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(logout.fulfilled, () => initialState);

      builder.addCase(signIn.fulfilled, (state: AuthState, { payload: { user, accessToken } }) => {
         state.isFetching = false;
         state.isSuccess = true;
         state.isLoggedIn = true;
         state.me = user;
         state.accessToken = accessToken;
      });

      builder.addCase(getMe.fulfilled, (state: AuthState, { payload: { user } }) => {
         state.me = user;
      });

      builder.addMatcher(isAnyOf(signUpUser.fulfilled, isAvailableEmailUsername.fulfilled), (state: AuthState) => {
         state.isFetching = false;
         state.isSuccess = true;
      });

      builder.addMatcher(
         isAnyOf(signUpUser.pending, isAvailableEmailUsername.pending, signIn.pending, logout.pending),
         (state: AuthState) => {
            state.isFetching = true;
         },
      );

      builder.addMatcher(
         isAnyOf(signUpUser.rejected, isAvailableEmailUsername.rejected, signIn.rejected),
         (state: AuthState, action) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = action.payload;
            state.errorMessage = action.payload ? action.payload : action.error.message;
         },
      );
   },
});

export const { clearState, reset, updateAccessToken } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
