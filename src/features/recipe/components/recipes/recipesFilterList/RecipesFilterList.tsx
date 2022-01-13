import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '@/components/core/spinner/Spinner';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { getMoreRecipes } from '@/features/recipe/store/getMoreRecipes';
import RecipesList from '@/features/recipe/components/recipes/recipesList/RecipesList';
import styles from '@/features/recipe/components/recipes/recipesFilterList/RecipesFilterList.module.scss';
import { clearStatuses, recipesSelector } from '@/features/recipe/store/RecipesSlice';

const RecipesFilterList = () => {
   const { filters, isError, errorMessage, isSuccess, filteredRecipes, hasMore, isEmpty } =
      useAppSelector(recipesSelector);

   const dispatch = useAppDispatch();

   const getMore = () =>
      dispatch(
         getMoreRecipes({
            skip: filteredRecipes.length,
            take: 9,
            ...filters,
         }),
      );

   useEffect(
      () => () => {
         dispatch(clearStatuses());
      },
      [],
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
                     <Spinner variant="primary" size="regular" />
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
         {isError && errorMessage && (
            <p role="alert" className={styles.resultsAlert}>
               {errorMessage}
            </p>
         )}
      </>
   );
};

export default RecipesFilterList;
