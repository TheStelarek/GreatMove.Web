import * as yup from 'yup';

export interface LoginFormValue {
  email: string;
  password: string;
}

export const LoginValidationSchema = yup.object({
  email: yup
    .string()
    .email(`Email must be a valid email.`)
    .required(`Email is required.`),
  password: yup.string().required(`Password is required.`),
});
