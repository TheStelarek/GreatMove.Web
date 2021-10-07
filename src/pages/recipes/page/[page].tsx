import React, { ReactElement, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import styles from '@/styles/Recipes.module.scss';
import Layout from '@/components/core/layout/Layout';
import RecipesList from '@/components/recipes/recipesList/RecipesList';
import { NextApplicationPage } from '@/utils/types/NextApplicationPage';
import { Recipe } from '@/utils/types/Recipe';
import Pagination from '@/components/core/pagination/Pagination';
import { apiClient } from '@/api/apiClient';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { clearState, recipesSelector } from '@/store/recipes/RecipesSlice';
import RecipesFilterList from '@/components/recipes/recipesFilterList/RecipesFilterList';
import RecipesFilterForm from '@/components/recipes/recipesFilterForm/RecipesFilterForm';
import FilterIcon from '@/public/filter.svg';

interface RecipesProps {
  recipes: Recipe[];
  currentPage: string;
  totalPages: number;
}

const RecipesIndexPage: NextApplicationPage<RecipesProps> = ({
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

RecipesIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout whiteNavbar>{page}</Layout>;
};

export default RecipesIndexPage;

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
  const response = await apiClient.get(
    `/recipes?take=9&skip=${9 * (parseInt(page, 10) - 1)}`,
  );

  return {
    props: {
      recipes: response.data.data,
      totalPages: Math.ceil(response.data.total / 9),
      currentPage: page,
    },
  };
};
