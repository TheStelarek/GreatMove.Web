import React, { ReactElement } from 'react';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import { Recipe } from '@/features/recipe/utils/types/Recipe';
import { apiClient } from '@/api/apiClient';
import RecipesContainer from '@/features/recipe/containers/recipesContainer/RecipesContainer';

interface RecipesProps {
   recipes: Recipe[];
   currentPage: string;
   totalPages: number;
}

const Recipes: NextApplicationPage<RecipesProps> = ({ recipes, totalPages, currentPage }) => (
   <RecipesContainer totalPages={totalPages} currentPage={currentPage} recipes={recipes} />
);

Recipes.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};

export default Recipes;

export async function getStaticProps() {
   const response = await apiClient.get(`/recipes?take=9&skip=0`);

   return {
      props: {
         recipes: response.data.data,
         totalPages: Math.ceil(response.data.total / 9),
         currentPage: `1`,
      },
      revalidate: 60,
   };
}
