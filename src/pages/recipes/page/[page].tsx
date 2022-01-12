import { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import MainLayout from '@/layouts/mainLayout/MainLayout';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import { apiClient } from '@/api/apiClient';
import { Recipe } from '@/features/recipe/utils/types/Recipe';
import RecipesContainer from '@/features/recipe/containers/recipesContainer/RecipesContainer';

interface RecipesProps {
   recipes: Recipe[];
   currentPage: string;
   totalPages: number;
}

const RecipesPage: NextApplicationPage<RecipesProps> = ({ recipes, totalPages, currentPage }) => (
   <RecipesContainer totalPages={totalPages} currentPage={currentPage} recipes={recipes} />
);

RecipesPage.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};

export default RecipesPage;

export async function getStaticPaths() {
   const response = await apiClient.get(`/recipes`);
   const totalRecipes = response.data.total;
   const totalPages = Math.ceil(totalRecipes / 9);
   const paths = [];

   for (let page = 2; page <= totalPages; page += 1) {
      paths.push({ params: { page: page.toString() } });
   }

   return {
      paths,
      fallback: false,
   };
}

interface IParams extends ParsedUrlQuery {
   page: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const { page } = params as IParams;
   const response = await apiClient.get(`/recipes?take=9&skip=${9 * (parseInt(page, 10) - 1)}`);

   return {
      props: {
         recipes: response.data.data,
         totalPages: Math.ceil(response.data.total / 9),
         currentPage: page,
      },
      revalidate: 60,
   };
};
