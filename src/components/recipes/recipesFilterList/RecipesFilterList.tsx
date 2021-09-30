import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '@/components/core/spinner/Spinner';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { getMoreRecipes } from '@/store/recipes/getMoreRecipes';
import { recipesSelector } from '@/store/recipes/RecipesSlice';
import RecipesList from '@/components/recipes/recipesList/RecipesList';
import styles from '@/components/recipes/recipesFilterList/RecipesFilterList.module.scss';

const RecipesFilterList: React.FC = () => {
  const {
    isError,
    errorMessage,
    isSuccess,
    filteredRecipes,
    hasMore,
    searchName,
    isEmpty,
  } = useAppSelector(recipesSelector);
  const dispatch = useAppDispatch();

  const getMore = () =>
    dispatch(
      getMoreRecipes({
        skip: filteredRecipes.length,
        take: 9,
        name: searchName,
      }),
    );

  return (
    <>
      {isSuccess && !isEmpty && (
        <InfiniteScroll
          dataLength={filteredRecipes.length}
          next={getMore}
          hasMore={hasMore}
          className={styles.scrollWrapper}
          loader={
            <div className={styles.spinnerWrapper}>
              <Spinner blue />
            </div>
          }
        >
          <RecipesList recipes={filteredRecipes} />
        </InfiniteScroll>
      )}
      {isSuccess && isEmpty && (
        <p role="alert" className={styles.resultsAlert}>
          Nothing found.
        </p>
      )}
      {isError && (
        <p role="alert" className={styles.resultsAlert}>
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default RecipesFilterList;
