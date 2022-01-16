import { useCallback, useEffect, FC } from 'react';
import router from 'next/router';
import { useDropzone } from 'react-dropzone';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { skipToken } from '@reduxjs/toolkit/query';
import styles from '@/features/recipe/components/create-recipe/createRecipeForm/CreateRecipeForm.module.scss';
import Input from '@/components/core/input/Input';
import Button from '@/components/core/button/Button';
import Divider from '@/components/core/divider/Divider';
import Radio from '@/components/core/radio/Radio';
import TextArea from '@/components/core/textArea/TextArea';
import Spinner from '@/components/core/spinner/Spinner';
import Checkbox from '@/components/core/checkbox/Checkbox';
import TagCheckbox from '@/components/core/tagCheckbox/TagCheckbox';
import { diets, meals, tags, difficulties, privacyOptions } from '@/features/recipe/utils/data';
import { ErrorType } from '@/utils/types/ErrorType';
import { useAddRecipeMutation, useGetRecipeByIdQuery, useUpdateRecipeMutation } from '@/features/recipe/api/recipesApi';
import { RecipeFormValues } from '@/features/recipe/components/create-recipe/createRecipeForm/recipeFormValues';
import { PICTURE_SUPPORTED_FORMATS } from '@/features/recipe/components/create-recipe/createRecipeForm/pictureValidationData';
import { CreateRecipeValidationSchema } from '@/features/recipe/components/create-recipe/createRecipeForm/createRecipeValidationSchema';
import {
   UpdateRecipeValidationSchema,
   updateFields,
} from '@/features/recipe/components/create-recipe/createRecipeForm/updateRecipeValidationSchema';
import PictureFile from '@/public/create-recipe/photo-file.svg';
import Remove from '@/public/my-shopping-list/remove.svg';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { authSelector } from '@/features/auth/store/AuthSlice';

interface CreateRecipeFormProps {
   recipeId?: string;
   isAddMode?: boolean;
}

const CreateRecipeForm: FC<CreateRecipeFormProps> = ({ recipeId, isAddMode = true }) => {
   const { me } = useAppSelector(authSelector);
   const [addRecipe, result] = useAddRecipeMutation();
   const [updateRecipe, updateResult] = useUpdateRecipeMutation();

   const { data: recipeData, isError, error } = useGetRecipeByIdQuery(recipeId || skipToken);

   const {
      control,
      register,
      handleSubmit,
      setValue,
      watch,
      reset,
      formState: { errors },
   } = useForm<RecipeFormValues>({
      mode: `onSubmit`,
      resolver: yupResolver(isAddMode ? CreateRecipeValidationSchema : UpdateRecipeValidationSchema),
      defaultValues: {
         ingredients: [{ weight: undefined, name: undefined }],
         steps: [{ step: `` }],
         tags: [],
         useConsent: false,
      },
   });
   const recipePictures = watch(`picture`);

   const { fields: stepFields, append: stepAppend, remove: stepRemove } = useFieldArray({ control, name: `steps` });
   const {
      fields: ingredientFields,
      append: ingredientAppend,
      remove: ingredientRemove,
   } = useFieldArray({ control, name: `ingredients` });

   const onDrop = useCallback(
      (droppedFiles) => {
         setValue(`picture`, droppedFiles, { shouldValidate: true });
      },
      [setValue],
   );

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      maxFiles: 1,
      accept: PICTURE_SUPPORTED_FORMATS,
   });

   const onSubmit = (data: RecipeFormValues) => {
      const reader = new FileReader();
      if (!isAddMode && recipeData) {
         if (data.picture) {
            reader.readAsDataURL(data.picture[`0`]);
            reader.onloadend = async () => {
               updateRecipe({ ...data, photo: reader.result, recipeId: recipeData.id });
            };
         } else {
            updateRecipe({ ...data, photo: null, recipeId: recipeData.id });
         }
      } else {
         reader.readAsDataURL(data.picture[`0`]);
         reader.onloadend = async () => {
            addRecipe({ ...data, photo: reader.result });
         };
      }
   };

   useEffect(() => {
      if (!isAddMode && !isError && recipeData) {
         const updateFormValue: { [key: string]: () => void } = {
            steps: () => {
               const steps = recipeData.steps.map(({ step }) => ({
                  step,
               }));
               setValue(`steps`, steps);
            },
            ingredients: () => {
               const recipeIngredients = recipeData.ingredients.map((ingredient) => ({
                  name: ingredient.name,
                  weight: ingredient.weight,
               }));
               setValue(`ingredients`, recipeIngredients);
            },
            tags: () => {
               const recipeTags = recipeData?.tags.map(({ name }) => name);
               setValue(`tags`, recipeTags);
            },
            visibility: () => {
               const recipeVisibility = recipeData.visibility;
               setValue(`visibility`, { label: recipeVisibility, value: recipeVisibility });
            },
         };

         if (recipeData.userId !== me?.id) {
            router.push(`/`);
         } else {
            updateFields.forEach((field) => {
               if (recipeData[field]) {
                  // eslint-disable-next-line no-unused-expressions
                  updateFormValue[field] ? updateFormValue[field]() : setValue(field, recipeData[field]);
               }
            });
         }
      }
   }, [isAddMode, isError, recipeData, setValue]);

   useEffect(() => {
      if (result.isSuccess || updateResult.isSuccess) {
         reset();
         router.push(`/`);
      }
   }, [result, updateResult, reset]);

   return (
      <form className={styles.createRecipeForm} onSubmit={handleSubmit(onSubmit)} noValidate>
         {!isAddMode && !recipeData && !isError ? (
            <div style={{ marginTop: `50px` }}>
               <Spinner size="extra-large" variant="ghost-primary" />
            </div>
         ) : (
            <>
               <div className={styles.uploadPhotoContainer}>
                  <span className={styles.uploadTitle}>Upload recipe photo</span>
                  <p className={styles.info}>Photo should be jpg/jpeg/png and max 2.5mb size</p>
                  <div className={styles.uploadPhotoWrapper}>
                     <div {...getRootProps()} className={styles.upload}>
                        <PictureFile className={styles.uploadArt} />
                        <input {...getInputProps()} />
                        <p className={styles.description}>Drag & drop your files here</p>
                        <div className={styles.dividerWrapper}>
                           <Divider text="or" />
                        </div>
                        <Button size="regular" borderRadius={8} isBold>
                           Browse files
                        </Button>
                     </div>
                  </div>
                  {recipePictures &&
                     !!Object.entries(recipePictures)?.length &&
                     Object.entries(recipePictures).map(([, file]) => (
                        <img
                           key={file.name}
                           src={URL.createObjectURL(file)}
                           alt="recipe"
                           className={styles.recipePhoto}
                        />
                     ))}
                  {!isAddMode && !recipePictures && recipeData?.pictureUrl && (
                     <img src={recipeData.pictureUrl} alt="recipe" className={styles.recipePhoto} />
                  )}
                  {errors && errors.picture && <p className="error">{errors.picture.message} </p>}
               </div>

               <div className={styles.boxInfo}>
                  <span className={styles.title}>Recipe information</span>
                  <Input
                     variant="gray"
                     type="text"
                     label="Title"
                     placeholder="Recipe title"
                     size="big"
                     radius={5}
                     {...register(`title`)}
                     error={errors?.title?.message}
                  />
                  <TextArea
                     variant="gray"
                     label="Description"
                     placeholder="Recipe description"
                     size="big"
                     radius={5}
                     {...register(`description`)}
                     error={errors?.description?.message}
                  />
               </div>

               <div className={styles.boxInfo}>
                  <span className={styles.title}>Estimated time</span>
                  <Input
                     variant="gray"
                     type="number"
                     label="Preparation time (mins)"
                     placeholder="Estimated preparation time"
                     size="big"
                     radius={5}
                     min={0}
                     max={999}
                     {...register(`preparationTime`)}
                     error={errors?.preparationTime?.message}
                  />
                  <Input
                     variant="gray"
                     type="number"
                     label="Cook time (mins)"
                     placeholder="Estimated cook time"
                     size="big"
                     radius={5}
                     min={0}
                     max={999}
                     {...register(`cookTime`)}
                     error={errors?.cookTime?.message}
                  />
               </div>

               <div className={styles.boxInfo}>
                  <span className={styles.title}>Nourishment</span>
                  <Input
                     variant="gray"
                     type="number"
                     label="Calories"
                     placeholder="Calories"
                     size="big"
                     radius={5}
                     min={0}
                     max={999}
                     {...register(`calories`)}
                     error={errors?.calories?.message}
                  />
                  <Input
                     variant="gray"
                     type="number"
                     label="Proteins"
                     placeholder="Proteins"
                     size="big"
                     radius={5}
                     min={0}
                     max={999}
                     {...register(`proteins`)}
                     error={errors?.proteins?.message}
                  />
                  <Input
                     variant="gray"
                     type="number"
                     label="Carbs"
                     placeholder="Carbs"
                     size="big"
                     radius={5}
                     {...register(`carbs`)}
                     error={errors?.carbs?.message}
                  />
                  <Input
                     variant="gray"
                     type="number"
                     min={0}
                     max={9999}
                     label="Fats"
                     placeholder="Fats"
                     size="big"
                     radius={5}
                     {...register(`fats`)}
                     error={errors?.fats?.message}
                  />
                  <Input
                     variant="gray"
                     type="number"
                     label="Fibre"
                     placeholder="Fibre"
                     size="big"
                     radius={5}
                     min={0}
                     max={999}
                     {...register(`fibre`)}
                     error={errors?.fibre?.message}
                  />
               </div>

               <div className={styles.boxInfo}>
                  <span className={styles.title}>More information</span>
                  <TextArea
                     variant="gray"
                     label="Tips"
                     placeholder="Tips"
                     size="big"
                     radius={5}
                     {...register(`tips`)}
                     error={errors?.tips?.message}
                  />
                  <div className={styles.sectionContainer}>
                     <p className={styles.subTitle}>How difficult is the recipe?</p>
                     <div className={styles.wrapper}>
                        {difficulties.map((difficulty) => (
                           <Radio
                              key={difficulty}
                              fontVariant="p1"
                              fontWeight="regular"
                              value={difficulty}
                              label={difficulty}
                              {...register(`difficulty`)}
                           />
                        ))}
                     </div>
                     {errors && errors.difficulty && <p className="error">{errors.difficulty.message} </p>}
                  </div>
                  <div className={styles.sectionContainer}>
                     <p className={styles.subTitle}>Select type of meal</p>
                     <div className={styles.wrapper}>
                        {meals.map((meal) => (
                           <TagCheckbox
                              key={`${meal}-meal`}
                              type="radio"
                              value={meal}
                              {...register(`meal`)}
                              label={meal}
                           />
                        ))}
                     </div>
                     {errors && errors.meal && <p className="error">{errors.meal.message} </p>}
                  </div>
                  <div className={styles.sectionContainer}>
                     <p className={styles.subTitle}>Select type of diet</p>
                     <div className={styles.wrapper}>
                        {diets.map((diet) => (
                           <TagCheckbox
                              key={`${diet}-diet`}
                              type="radio"
                              value={diet}
                              {...register(`diet`)}
                              label={diet}
                           />
                        ))}
                     </div>
                     {errors && errors.diet && <p className="error">{errors.diet.message} </p>}
                  </div>
                  <div className={styles.sectionContainer}>
                     <p className={styles.subTitle}>Select some tags</p>
                     <div className={styles.wrapper}>
                        {tags.map((tag) => (
                           <TagCheckbox
                              key={`${tag}-tag`}
                              type="checkbox"
                              value={tag}
                              {...register(`tags`)}
                              label={tag}
                           />
                        ))}
                     </div>
                  </div>
               </div>

               <div className={styles.boxInfo}>
                  <span className={styles.title}>Ingredients</span>
                  <ul className={styles.list}>
                     {ingredientFields.map((field, index) => (
                        <li key={field.id} className={styles.listItem}>
                           <Input
                              variant="gray"
                              size="regular"
                              radius={5}
                              type="text"
                              placeholder="Name"
                              {...register(`ingredients.${index}.name` as const)}
                              error={errors?.ingredients?.[index]?.name?.message}
                           />
                           <Input
                              variant="gray"
                              type="number"
                              min={0}
                              max={9999}
                              placeholder="Weight"
                              size="regular"
                              radius={5}
                              {...register(`ingredients.${index}.weight` as const)}
                              error={errors?.ingredients?.[index]?.weight?.message}
                           />
                           <button type="button" onClick={() => ingredientRemove(index)} className={styles.removeBtn}>
                              <Remove />
                           </button>
                        </li>
                     ))}
                  </ul>
                  <div className={styles.addBtnWrapper}>
                     <Button
                        size="regular"
                        borderRadius={5}
                        onClick={() => ingredientAppend({ name: undefined, weight: undefined })}
                     >
                        New ingredient
                     </Button>
                  </div>
                  {errors && errors.ingredients && <p className="error">{(errors.ingredients as any)?.message} </p>}
               </div>

               <div className={styles.boxInfo}>
                  <span className={styles.title}>Steps</span>
                  <ul className={styles.list}>
                     {stepFields.map((field, index) => (
                        <li key={field.id} className={styles.listItem}>
                           <Input
                              variant="gray"
                              type="text"
                              placeholder={`Step ${index + 1}`}
                              size="regular"
                              radius={5}
                              {...register(`steps.${index}.step` as const)}
                              error={errors?.steps?.[index]?.step?.message}
                           />
                           <button type="button" onClick={() => stepRemove(index)} className={styles.removeBtn}>
                              <Remove />
                           </button>
                        </li>
                     ))}
                  </ul>
                  <div className={styles.addBtnWrapper}>
                     <Button size="regular" borderRadius={5} onClick={() => stepAppend({ step: `` })}>
                        Next step
                     </Button>
                  </div>
                  {errors && errors.steps && <p className="error">{(errors.steps as any)?.message} </p>}
               </div>

               <div className={styles.privacyContainer}>
                  <div className={styles.visibilityWrapper}>
                     <Controller
                        name="visibility"
                        control={control}
                        render={({ field }) => (
                           <Select
                              isSearchable={false}
                              classNamePrefix="react-select"
                              className="rs rs-large"
                              options={privacyOptions}
                              {...field}
                              placeholder="Select visibility"
                           />
                        )}
                     />
                     {errors && errors.visibility && (
                        <p className="error">{(errors.visibility as any)?.value?.message} </p>
                     )}
                  </div>

                  {isAddMode && (
                     <Checkbox
                        fontVariant="p1"
                        fontWeight="regular"
                        value="true"
                        label="I agree to the use of the recipe by our service"
                        {...register(`useConsent`)}
                     />
                  )}
               </div>

               {result.isError && result.error && <p className="error">{(result.error as ErrorType).data.message}</p>}
               {updateResult.isError && updateResult.error && (
                  <p className="error">{(updateResult.error as ErrorType).data.message}</p>
               )}

               <div className={styles.saveBtnWrapper}>
                  <Button
                     type="submit"
                     size="large"
                     isBold
                     borderRadius={5}
                     isLoading={result.isLoading || updateResult.isLoading}
                  >
                     {isAddMode ? `Save recipe` : `Update recipe`}
                  </Button>
               </div>
            </>
         )}
         {isError && error && <p className="error">{(error as ErrorType).data.message}</p>}
      </form>
   );
};

export default CreateRecipeForm;
