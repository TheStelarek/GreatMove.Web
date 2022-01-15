import { api } from '@/store/api/api';

export const authApi = api.injectEndpoints({
   endpoints: (build) => ({
      recoverPassword: build.mutation<string, { email: string }>({
         query: ({ email }) => ({
            url: `/auth/forget-password`,
            method: `post`,
            data: { email },
         }),
      }),
      resetPassword: build.mutation<string, { password: string; password_confirmation: string; token: string }>({
         query: ({ password, password_confirmation, token }) => ({
            url: `/auth/reset-password?token=${token}`,
            method: `patch`,
            data: { password, password_confirmation },
         }),
      }),
   }),
});

export const { useRecoverPasswordMutation, useResetPasswordMutation } = authApi;
