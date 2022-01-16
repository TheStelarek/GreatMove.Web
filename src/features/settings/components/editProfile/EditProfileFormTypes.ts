import * as yup from 'yup';

export interface EditProfileFormValue {
   email: string;
   firstName?: string;
   lastName?: string;
   city?: string;
   phone?: string;
   bio?: string;
   website?: string;
}

export const EditProfileValidationSchema = yup.object().shape({
   email: yup.string().email(`Email must be a valid email`).required(`Email is required`),
   firstName: yup.string().max(32, `First name must be at most 32 characters`).nullable(),
   lastName: yup.string().max(32, `Last name must be at most 32 characters`).nullable(),
   city: yup.string().max(60, `City must be at most 60 characters`).nullable(),
   phone: yup.string().max(20, `Phone must be at most 20 characters`).nullable(),
   bio: yup.string().max(400, `Phone must be at most 400 characters`).nullable(),
   webiste: yup.string().max(60, `Website must be at most 60 characters`).nullable(),
});
