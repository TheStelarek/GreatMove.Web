import { CreateRecipeFormValue } from '@/components/create-recipe/createRecipeForm/CreateRecipeFormTypes';
import { api } from './api';

export const recipesApi = api.injectEndpoints({
   endpoints: (build) => ({
      getRecipeById: build.query({
         query: (recipeId) => ({
            url: `/recipes/${recipeId}`,
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
               tags: recipeFormData.tags,
               steps: recipeFormData.steps.map(({ step }) => step),
               ingredients: recipeFormData.ingredients.map(({ name, weight }) => ({ product: name, weight })),
               picture: recipeFormData.photo,
            },
         }),
      }),
   }),
});

export const { useGetRecipeByIdQuery, useAddRecipeMutation } = recipesApi;
