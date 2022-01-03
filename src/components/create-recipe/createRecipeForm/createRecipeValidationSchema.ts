import * as yup from 'yup';
import { MAX_PICTURE_SIZE, PICTURE_SUPPORTED_FORMATS } from './pictureValidationData';

export const CreateRecipeValidationSchema = yup.object({
   picture: yup
      .mixed()
      .test(`required`, `You need to provide a picture`, (value) => value && value.length)
      .test(`fileSize`, `The file is too large. Max is 2.5 MB`, (value) => {
         console.log(`create`);
         return value && value[0] && value[0].size <= MAX_PICTURE_SIZE;
      })
      .test(
         `type`,
         `We only support jpg/jpeg/png files`,
         (value) => value && value[0] && PICTURE_SUPPORTED_FORMATS.includes(value[0].type),
      ),
   title: yup.string().max(80, `Title must be at most 80 characters`).required(`Title is required`),
   preparationTime: yup
      .number()
      .typeError(`Preparation time is required and must be a number`)
      .min(0, `Preparation time must be at least 0`)
      .max(999, `Preparation time must be at most 999`)
      .required(`Preparation time is required`),
   cookTime: yup
      .number()
      .typeError(`Cook time must be a number`)
      .transform((v) => (Number.isNaN(v) ? null : v))
      .min(0, `Cook time must be at least 0`)
      .max(999, `Cook time must be at most 999`)
      .nullable(),
   description: yup.string().max(400, `Description must be at most 400 characters`).required(`Description is required`),
   tips: yup.string().max(400, `Tips must be at most 400 characters`),
   calories: yup
      .number()
      .typeError(`Calories are required and must be a number`)
      .min(0, `Calories must be at least 0`)
      .max(999, `Calories must be at most 999`)
      .required(`Calories number is required`),
   proteins: yup
      .number()
      .typeError(`Proteins are required and must be a number`)
      .min(0, `Proteins must be at least 0`)
      .max(999, `Proteins must be at most 999`)
      .required(`Proteins number is required`),
   carbs: yup
      .number()
      .typeError(`Carbs are required and must be a number`)
      .min(0, `Carbs must be at least 0`)
      .max(999, `Carbs must be at most 999`)
      .required(`Carbs number is required`),
   fats: yup
      .number()
      .typeError(`Fats are required and must be a number`)
      .min(0, `Cook time must be at least 0`)
      .max(999, `Cook time must be at most 999`)
      .required(`Fats number is required`),
   fibre: yup
      .number()
      .typeError(`Fibre must be a number`)
      .transform((v) => (Number.isNaN(v) ? null : v))
      .min(0, `Fibre must be at least 0`)
      .max(999, `Fibre must be at most 999`)
      .nullable(),
   difficulty: yup.string().required(`Difficuly must be set`).nullable(),
   meal: yup.string().required(`Meal must be set`).nullable(),
   diet: yup.string().nullable(),
   visibility: yup
      .object()
      .shape({
         value: yup.string().required(`Visibility must be set`),
      })
      .required(`Visibility must be set`),
   steps: yup
      .array()
      .of(
         yup.object().shape({
            step: yup.string().max(120, `Max length is 120 characters`).required(`Step is required`),
         }),
      )
      .required()
      .min(1, `Steps are required`),
   ingredients: yup
      .array()
      .of(
         yup.object().shape({
            weight: yup
               .number()
               .typeError(`Value must be a number`)
               .min(0, `Min value is 0`)
               .max(9999, `Max value is 9999`)
               .required(`Weight is required`),
            name: yup
               .string()
               .min(0, `Min value is 0`)
               .max(100, `Max length is 100 characters`)
               .required(`Name is required`),
         }),
      )
      .required()
      .min(1, `Ingredients are required`),
});
