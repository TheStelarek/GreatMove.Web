import { axiosBaseQuery } from '@/api/axiosBaseQuery';
import { CreateRecipeFormValue } from '@/components/create-recipe/createRecipeForm/CreateRecipeFormTypes';
import { createApi } from '@reduxjs/toolkit/query/react';

export const userRecipesApi = createApi({
   reducerPath: `userRecipesApi`,
   baseQuery: axiosBaseQuery(),
   endpoints: (build) => ({
      getUserRecipes: build.query<
         any,
         {
            pageSize: number;
            pageIndex: number;
         }
      >({
         query: ({ pageSize, pageIndex }) => ({
            url: `/recipes/my-recipes?take=${pageSize}&skip=${pageIndex * pageSize}`,
            method: `get`,
         }),
      }),
      addRecipe: build.mutation<string, CreateRecipeFormValue & { photo: string | ArrayBuffer | null }>({
         query: (recipeFormData) => ({
            url: `/recipes`,
            method: `post`,
            data: {
               name: recipeFormData.title,
               preparationTime: recipeFormData.preparationTime,
               cookTime: recipeFormData.cookTime,
               description: recipeFormData.description,
               calories: recipeFormData.calories,
               proteins: recipeFormData.proteins,
               carbs: recipeFormData.carbs,
               fats: recipeFormData.fats,
               fibre: recipeFormData.fibre,
               useConsent: recipeFormData.useConsent,
               visibility: recipeFormData.visibility.value,
               meal: recipeFormData.meal,
               difficulty: recipeFormData.difficulty,
               steps: recipeFormData.steps.map(({ step }) => step),
               ingredients: recipeFormData.ingredients.map(({ name, weight }) => ({ product: name, weight })),
               picture: recipeFormData.photo,
            },
         }),
      }),
   }),
});

export const { useGetUserRecipesQuery, useAddRecipeMutation } = userRecipesApi;
