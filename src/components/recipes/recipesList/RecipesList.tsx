import styles from '@/components/recipes/recipesList/RecipesList.module.scss';
import { Recipe } from '@/utils/types/Recipe';
import RecipesListItem from '@/components/recipes/recipesListItem/RecipesListItem';

interface RecipesListProps {
   recipes: Array<Recipe>;
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
