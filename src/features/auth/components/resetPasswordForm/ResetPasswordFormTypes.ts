import * as yup from 'yup';

export interface ResetPasswordFormValue {
   password: string;
   password_confirmation: string;
}

export const ResetPasswordValidationSchema = yup.object().shape({
   password: yup
      .string()
      .min(6, `Password must be at least 6 characters`)
      .max(32, `Password must be at most 32 characters`)
      .required(`Password is required`),
   password_confirmation: yup
      .string()
      .oneOf([yup.ref(`password`), null], `Passwords don't match!`)
      .required(`Password confirmation is required`),
});
