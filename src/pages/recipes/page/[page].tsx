import React, { ReactElement } from 'react';
import styles from '@/styles/Recipes.module.scss';
import Layout from '@/components/core/layout/Layout';
import RecipesList from '@/components/recipes/recipesList/RecipesList';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import { Recipe } from '@/utils/types/Recipe';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface RecipesProps {
  recipes: Recipe[];
  currentPage: string;
  totalPages: number;
}

const RecipesIndexPage: NextApplicationPage<RecipesProps> = ({
  recipes,
  totalPages,
  currentPage,
}) => (
  <div className={styles.container}>
    <RecipesList
      recipes={recipes}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  </div>
);

RecipesIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout whiteNavbar>{page}</Layout>;
};

export default RecipesIndexPage;

export async function getStaticPaths() {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const json = await data.json();
  const totalRecipes = json.count;

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
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${
      9 * parseInt(page, 10)
    }`,
  );
  const json = await data.json();
  const totalPages = Math.ceil(json.count / 9);

  const recipes = json.results.map((item: { name: string }) => ({
    name: item.name.toUpperCase(),
    meal: `Breakfast`,
    calories: 521,
    difficulty: `EASY`,
    estimatedTime: 15,
  }));

  return {
    props: {
      recipes,
      totalPages,
      currentPage: page,
    },
  };
};
