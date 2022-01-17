import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/query';
import Spinner from '@/components/core/spinner/Spinner';
import { ErrorType } from '@/utils/types/ErrorType';
import styles from '@/features/recipe/containers/recipeContainer/RecipeContainer.module.scss';
import RecipeWrapper from '@/features/recipe/components/recipe/recipeWrapper/RecipeWrapper';
import { useGetRecipeByIdQuery } from '@/features/recipe/api/recipesApi';

const RecipeContainer = () => {
   const router = useRouter();
   const { data, isLoading, isError, error } = useGetRecipeByIdQuery(
      router.query.id ? (router.query.id as string) : skipToken,
   );

   return (
      <>
         {isLoading && (
            <div className={styles.wrapper}>
               <Spinner size="extra-large" variant="ghost-secondary" />
            </div>
         )}
         {isError && error && (
            <div className={styles.wrapper}>
               <p className="error">{(error as ErrorType).data.message}</p>
            </div>
         )}

         {data && !isError && <RecipeWrapper recipe={data} />}
      </>
   );
};

export default RecipeContainer;
