import { ReactElement } from 'react';
import styles from '@/styles/Recipes.module.scss';
import Layout from '@/components/core/layout/Layout';
import RecipesList from '@/components/recipes/recipesList/RecipesList';

const data = [
  {
    name: `Owsianka z bananami i borówkami`,
    meal: `Breakfast`,
    calories: 521,
    difficulty: `EASE`,
    estimatedTime: 10,
  },
  {
    name: `Owsianka z bananami i borówkami`,
    meal: `Breakfast`,
    calories: 521,
    difficulty: `EASE`,
    estimatedTime: 10,
  },
  {
    name: `Owsianka z bananami i borówkami`,
    meal: `Breakfast`,
    calories: 521,
    difficulty: `EASE`,
    estimatedTime: 10,
  },
  {
    name: `Owsianka z bananami i borówkami`,
    meal: `Breakfast`,
    calories: 521,
    difficulty: `EASE`,
    estimatedTime: 10,
  },
];

export default function Recipes() {
  return (
    <div className={styles.container}>
      <RecipesList data={data} />
    </div>
  );
}

Recipes.getLayout = function getLayout(page: ReactElement) {
  return <Layout whiteNavbar>{page}</Layout>;
};
