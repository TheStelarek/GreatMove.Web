import { useEffect, useState, FC } from 'react';
import styles from '@/features/recipe/containers/recipesContainer/RecipesContainer.module.scss';
import RecipesList from '@/features/recipe/components/recipes/recipesList/RecipesList';
import Pagination from '@/components/core/pagination/Pagination';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { clearState, recipesSelector } from '@/features/recipe/store/RecipesSlice';
import RecipesFilterList from '@/features/recipe/components/recipes/recipesFilterList/RecipesFilterList';
import RecipesFilterForm from '@/features/recipe/components/recipes/recipesFilterForm/RecipesFilterForm';
import Button from '@/components/core/button/Button';
import FilterIcon from '@/public/filter.svg';
import { Recipe } from '@/features/recipe/utils/types/Recipe';

interface RecipesContainerProps {
   recipes: Recipe[];
   currentPage: string;
   totalPages: number;
}

const RecipesContainer: FC<RecipesContainerProps> = ({ recipes, currentPage, totalPages }) => {
   const [showFilters, setShowFilter] = useState<boolean>(false);
   const { isFilterSearch } = useAppSelector(recipesSelector);
   const dispatch = useAppDispatch();

   useEffect(
      () => () => {
         dispatch(clearState());
      },
      [],
   );
   return (
      <div className={styles.container}>
         <div className={styles.filterBtnWrapper}>
            <Button
               leftIcon={<FilterIcon className={styles.icon} />}
               borderRadius={5}
               variant="ghost-primary"
               onClick={() => setShowFilter(!showFilters)}
            >
               FILTERS
            </Button>
         </div>

         {showFilters && <RecipesFilterForm />}

         {isFilterSearch ? (
            <RecipesFilterList />
         ) : (
            <div className={styles.staticRecipeList}>
               <RecipesList recipes={recipes} />
               {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} url="/recipes" />}
            </div>
         )}
      </div>
   );
};

export default RecipesContainer;
