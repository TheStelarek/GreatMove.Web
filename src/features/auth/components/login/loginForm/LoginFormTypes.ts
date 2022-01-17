import * as yup from 'yup';

export interface LoginFormValue {
   username: string;
   password: string;
}

export const LoginValidationSchema = yup.object({
   username: yup.string().required(`Username is required`),
   password: yup.string().required(`Password is required`),
});
