import styles from '@/features/recipe/components/recipes/recipesList/RecipesList.module.scss';
import { Recipe } from '@/features/recipe/utils/types/Recipe';
import RecipesListItem from '@/features/recipe/components/recipes/recipesListItem/RecipesListItem';

interface RecipesListProps {
   recipes: Recipe[];
}

const RecipesList: React.FC<RecipesListProps> = ({ recipes }) => (
   <div className={styles.container}>
      <div className={styles.wrapperList}>
         {recipes.length > 0 ? (
            recipes.map(({ id, title, meal, calories, difficulty, preparationTime, cookTime }) => (
               <RecipesListItem
                  key={id}
                  {...{
                     id,
                     title,
                     meal,
                     calories,
                     difficulty,
                     preparationTime,
                     cookTime,
                  }}
               />
            ))
         ) : (
            <h5>There are no recipes...</h5>
         )}
      </div>
   </div>
);

export default RecipesList;