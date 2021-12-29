import { useCallback, useEffect } from 'react';
import router from 'next/router';
import { useDropzone } from 'react-dropzone';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Input from '@/components/core/input/Input';
import styles from '@/components/create-recipe/createRecipeForm/CreateRecipeForm.module.scss';
import Button from '@/components/core/button/Button';
import Divider from '@/components/core/divider/Divider';
import Radio from '@/components/core/radio/Radio';
import Checkbox from '@/components/core/checkbox/Checkbox';
import TagCheckbox from '@/components/core/tagCheckbox/TagCheckbox';
import {
   CreateRecipeFormValue,
   CreateRecipeValidationSchema,
   PICTURE_SUPPORTED_FORMATS,
} from '@/components/create-recipe/createRecipeForm/CreateRecipeFormTypes';
import { privacyOptions } from '@/utils/data/recipes/privacySettings';
import { diets, meals, tags } from '@/utils/data/recipes';
import { difficulties } from '@/utils/data/recipes/difficulties';
import { ErrorType } from '@/utils/types/ErrorType';
import { useAddRecipeMutation } from '@/store/api/recipesApi';
import PictureFile from '@/public/create-recipe/photo-file.svg';
import Remove from '@/public/my-shopping-list/remove.svg';

const CreateRecipeForm = () => {
   const [addRecipe, result] = useAddRecipeMutation();

   const {
      control,
      register,
      handleSubmit,
      setValue,
      watch,
      reset,
      formState: { errors },
   } = useForm<CreateRecipeFormValue>({
      mode: `onSubmit`,
      resolver: yupResolver(CreateRecipeValidationSchema),
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

   const onSubmit = (data: CreateRecipeFormValue) => {
      const reader = new FileReader();
      reader.readAsDataURL(data.picture[`0`]);
      reader.onloadend = async () => {
         addRecipe({ ...data, photo: reader.result });
      };
   };

   useEffect(() => {
      if (result.isSuccess) {
         reset();
         router.push(`/`);
      }
   }, [result]);

   return (
      <form className={styles.createRecipeForm} onSubmit={handleSubmit(onSubmit)} noValidate>
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
                  <img key={file.name} src={URL.createObjectURL(file)} alt="recipe" className={styles.recipePhoto} />
               ))}
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
            <Input
               variant="gray"
               type="text"
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
            <span className={styles.title}>Nutrients</span>
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
            <Input
               variant="gray"
               type="text"
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
                     <TagCheckbox key={`${meal}-meal`} type="radio" value={meal} {...register(`meal`)} label={meal} />
                  ))}
               </div>
               {errors && errors.meal && <p className="error">{errors.meal.message} </p>}
            </div>
            <div className={styles.sectionContainer}>
               <p className={styles.subTitle}>Select type of diet</p>
               <div className={styles.wrapper}>
                  {diets.map((diet) => (
                     <TagCheckbox key={`${diet}-diet`} type="radio" value={diet} {...register(`diet`)} label={diet} />
                  ))}
               </div>
               {errors && errors.diet && <p className="error">{errors.diet.message} </p>}
            </div>
            <div className={styles.sectionContainer}>
               <p className={styles.subTitle}>Select some tags</p>
               <div className={styles.wrapper}>
                  {tags.map((tag) => (
                     <TagCheckbox key={`${tag}-tag`} type="checkbox" value={tag} {...register(`tags`)} label={tag} />
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
               {errors && errors.visibility && <p className="error">{(errors.visibility as any)?.value?.message} </p>}
            </div>

            <Checkbox
               fontVariant="p1"
               fontWeight="regular"
               value="true"
               label="I agree to the use of the recipe by our service"
               {...register(`useConsent`)}
            />
         </div>

         {result.isError && result.error && <p className="error">{(result.error as ErrorType).data.message}</p>}

         <div className={styles.saveBtnWrapper}>
            <Button type="submit" size="large" isBold borderRadius={5} isLoading={result.isLoading}>
               Save recipe
            </Button>
         </div>
      </form>
   );
};

export default CreateRecipeForm;
