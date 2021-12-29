import { ReactElement } from 'react';
import Layout from '@/components/core/layout/Layout';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import { useRouter } from 'next/router';
import { useGetRecipeByIdQuery } from '@/store/api/recipesApi';
import { skipToken } from '@reduxjs/toolkit/query';
import RecipeContainer from '@/components/recipe/recipeContainer/RecipeContainer';

const Recipe: NextApplicationPage = () => {
   const router = useRouter();
   const { data, isLoading, isFetching, isError } = useGetRecipeByIdQuery(
      router.query.id ? (router.query.id as string) : skipToken,
   );

   return <div>{data && <RecipeContainer recipe={data} />}</div>;
};

export default Recipe;

Recipe.getLayout = function getLayout(page: ReactElement) {
   return (
      <Layout navbarVariant="purple" navbarBoxShadow={false} fullWidth>
         {page}
      </Layout>
   );
};
