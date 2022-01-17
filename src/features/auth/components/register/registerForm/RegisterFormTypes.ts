import * as yup from 'yup';

export type RegisterFormValue = {
   email: string;
   username: string;
   password: string;
};

export type IsAvailableFunction = (name: 'email' | 'username', nextStep: number) => Promise<boolean>;

export type RegisterStepOptions = {
   [key: string]: () => Promise<boolean>;
};

export const RegisterValidationSchema = yup.object({
   email: yup.string().email(`Email must be a valid email`).required(`Email is required`),
   username: yup.string().max(30, `Username can be up to 30 characters long`).required(`Username is required`),
   password: yup
      .string()
      .required(`Password is required`)
      .min(6, `Password must contain at least 6 characters`)
      .max(32, `Password can be up to 32 characters long`),
});
