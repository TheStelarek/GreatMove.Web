import { RecipeFormValues } from '@/features/recipe/components/create-recipe/createRecipeForm/recipeFormValues';
import type { Recipe } from '@/features/recipe/utils/types/Recipe';
import { api } from '@/store/api/api';

export const recipesApi = api.injectEndpoints({
   endpoints: (build) => ({
      getRecipeById: build.query<Recipe, string>({
         query: (recipeId) => ({
            url: `/recipes/${recipeId}`,
            method: `get`,
         }),
      }),
      getMyRecipes: build.query<{ data: Recipe[]; total: number }, { pageSize: number; pageIndex: number }>({
         query: ({ pageSize, pageIndex }) => ({
            url: `/recipes/my-recipes?take=${pageSize}&skip=${pageIndex * pageSize}`,
            method: `get`,
         }),
         providesTags: [`Recipes`],
      }),
      addRecipe: build.mutation<string, RecipeFormValues & { photo: string | ArrayBuffer | null }>({
         query: (recipeFormData) => ({
            url: `/recipes`,
            method: `post`,
            data: {
               title: recipeFormData.title,
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
               diet: recipeFormData.diet,
               difficulty: recipeFormData.difficulty,
               tags: recipeFormData.tags,
               steps: recipeFormData.steps.map(({ step }) => step),
               ingredients: recipeFormData.ingredients.map(({ name, weight }) => ({ name, weight })),
               picture: recipeFormData.photo,
            },
         }),
         invalidatesTags: (result, error) => (error ? [] : [`Recipes`]),
      }),
      updateRecipe: build.mutation<string, RecipeFormValues & { photo: string | ArrayBuffer | null; recipeId: string }>(
         {
            query: (recipeFormData) => ({
               url: `/recipes/${recipeFormData.recipeId}`,
               method: `patch`,
               data: {
                  title: recipeFormData.title,
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
                  diet: recipeFormData.diet,
                  difficulty: recipeFormData.difficulty,
                  tags: recipeFormData.tags,
                  steps: recipeFormData.steps.map(({ step }) => step),
                  ingredients: recipeFormData.ingredients.map(({ name, weight }) => ({ name, weight })),
                  picture: recipeFormData.photo,
               },
            }),
            invalidatesTags: (result, error) => (error ? [] : [`Recipes`]),
         },
      ),
      addReview: build.mutation<string, { description: string; rating: number; recipeId: string }>({
         query: (reviewData) => ({
            url: `/recipes/${reviewData.recipeId}/review`,
            method: `post`,
            data: {
               description: reviewData.description,
               rating: reviewData.rating,
            },
         }),
      }),
      deleteRecipe: build.mutation<string, { recipeId: string }>({
         query: (recipeFormData) => ({
            url: `/recipes/${recipeFormData.recipeId}`,
            method: `delete`,
         }),
         invalidatesTags: (result, error) => (error ? [] : [`Recipes`]),
      }),
   }),
});

export const {
   useGetMyRecipesQuery,
   useGetRecipeByIdQuery,
   useAddRecipeMutation,
   useUpdateRecipeMutation,
   useAddReviewMutation,
   useDeleteRecipeMutation,
} = recipesApi;
