import * as yup from 'yup';

export interface ForgotPasswordFormValue {
   email: string;
}

export const ForgotPasswordValidationSchema = yup.object({
   email: yup.string().email(`Email must be a valid email`).required(`Email is required`),
});
