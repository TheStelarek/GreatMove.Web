import { useRouter } from 'next/router';
import { useGetRecipeByIdQuery } from '@/features/recipe/api/recipesApi';
import { skipToken } from '@reduxjs/toolkit/query';
import RecipeWrapper from '@/features/recipe/components/recipe/recipeWrapper/RecipeWrapper';

const RecipeContainer = () => {
   const router = useRouter();
   const { data, isLoading, isFetching, isError } = useGetRecipeByIdQuery(
      router.query.id ? (router.query.id as string) : skipToken,
   );

   return <div>{data && <RecipeWrapper recipe={data} />}</div>;
};

export default RecipeContainer;
