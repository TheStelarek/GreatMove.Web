import { api } from '@/store/api/api';
import { ChangePasswordFormValue } from '@/features/settings/components/changePassword/ChangePasswordFormTypes';
import { EditProfileFormValue } from '@/features/settings/components/editProfile/EditProfileFormTypes';

export const settingsApi = api.injectEndpoints({
   endpoints: (build) => ({
      changePassword: build.mutation<string, ChangePasswordFormValue>({
         query: ({ old_password, new_password, password_confirmation }) => ({
            url: `/users/change-password`,
            method: `patch`,
            data: { oldPassword: old_password, newPassword: new_password, passwordConfirmation: password_confirmation },
         }),
      }),

      updateProfile: build.mutation<string, EditProfileFormValue>({
         query: ({ email, firstName, lastName, city, phone, bio, website }) => ({
            url: `/users/profile`,
            method: `patch`,
            data: { email, firstName, lastName, city, phone, bio, website },
         }),
      }),

      updateAvatar: build.mutation<string, { picture: string | ArrayBuffer | null }>({
         query: ({ picture }) => ({
            url: `/users/avatar`,
            method: `patch`,
            data: { picture },
         }),
      }),
   }),
});

export const { useChangePasswordMutation, useUpdateProfileMutation, useUpdateAvatarMutation } = settingsApi;
