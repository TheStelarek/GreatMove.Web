import React, { ReactElement } from 'react';
import styles from '@/styles/Recipes.module.scss';
import Layout from '@/components/core/layout/Layout';
import RecipesList from '@/components/recipes/recipesList/RecipesList';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import { Recipe } from '@/utils/types/Recipe';

// const data = [
//   {
//     name: `Owsianka z bananami i borówkami`,
//     meal: `Breakfast`,
//     calories: 521,
//     difficulty: `EASE`,
//     estimatedTime: 10,
//   },
//   {
//     name: `Owsianka z bananami i borówkami`,
//     meal: `Breakfast`,
//     calories: 521,
//     difficulty: `EASE`,
//     estimatedTime: 10,
//   },
//   {
//     name: `Owsianka z bananami i borówkami`,
//     meal: `Breakfast`,
//     calories: 521,
//     difficulty: `EASE`,
//     estimatedTime: 10,
//   },
//   {
//     name: `Owsianka z bananami i borówkami`,
//     meal: `Breakfast`,
//     calories: 521,
//     difficulty: `EASE`,
//     estimatedTime: 10,
//   },
// ];
interface RecipesProps {
  recipes: Recipe[];
  currentPage: string;
  totalPages: number;
}

const Recipes: NextApplicationPage<RecipesProps> = ({
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

Recipes.getLayout = function getLayout(page: ReactElement) {
  return <Layout whiteNavbar>{page}</Layout>;
};

export default Recipes;

export async function getStaticProps() {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=9&offset=9`,
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
      currentPage: `1`,
    },
  };
}
