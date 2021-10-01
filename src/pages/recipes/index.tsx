import React, { ReactElement, useEffect, useState } from 'react';
import styles from '@/styles/Recipes.module.scss';
import Layout from '@/components/core/layout/Layout';
import RecipesList from '@/components/recipes/recipesList/RecipesList';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import { Recipe } from '@/utils/types/Recipe';
import Pagination from '@/components/core/pagination/Pagination';
import FilterIcon from '@/public/filter.svg';
import RecipesFilterList from '@/components/recipes/recipesFilterList/RecipesFilterList';
import RecipesFilterForm from '@/components/recipes/recipesFilterForm/RecipesFilterForm';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { clearState, recipesSelector } from '@/store/recipes/RecipesSlice';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { apiClient } from '@/api/apiClient';

interface RecipesProps {
  recipes: Recipe[];
  currentPage: string;
  totalPages: number;
}

const Recipes: NextApplicationPage<RecipesProps> = ({
  recipes,
  totalPages,
  currentPage,
}) => {
  const [showFilters, setShowFilter] = useState<boolean>(false);
  const { filterSearch } = useAppSelector(recipesSelector);
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(clearState());
    },
    [],
  );

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.filterBtn}
        onClick={() => setShowFilter(!showFilters)}
      >
        <FilterIcon className={styles.icon} /> Filters
      </button>

      {showFilters && <RecipesFilterForm />}

      {filterSearch ? (
        <RecipesFilterList />
      ) : (
        <div className={styles.staticRecipeList}>
          <RecipesList recipes={recipes} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            url="/recipes"
          />
        </div>
      )}
    </div>
  );
};

Recipes.getLayout = function getLayout(page: ReactElement) {
  return <Layout whiteNavbar>{page}</Layout>;
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
  };
}
