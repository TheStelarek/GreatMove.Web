import * as yup from 'yup';

export interface ChangePasswordFormValue {
   old_password: string;
   new_password: string;
   password_confirmation: string;
}

export const ChangePasswordValidationSchema = yup.object().shape({
   old_password: yup.string().required(`Old password is required`),
   new_password: yup
      .string()
      .min(6, `Password must be at least 6 characters`)
      .max(32, `Password must be at most 32 characters`)
      .required(`New password is required`),
   password_confirmation: yup
      .string()
      .oneOf([yup.ref(`new_password`), null], `Passwords don't match`)
      .required(`Password confirmation is required`),
});
