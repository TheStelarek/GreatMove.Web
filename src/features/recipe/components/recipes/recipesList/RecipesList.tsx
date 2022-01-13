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
            recipes.map(({ id, title, meal, calories, difficulty, preparationTime, cookTime, pictureUrl }) => (
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
                     pictureUrl,
                  }}
               />
            ))
         ) : (
            <h6>There are no recipes...</h6>
         )}
      </div>
   </div>
);

export default RecipesList;
