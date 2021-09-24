import styles from '@/components/recipes/recipesList/RecipesList.module.scss';
import { Recipe } from '@/utils/types/Recipe';
import RecipesListItem from '../recipesListItem/RecipesListItem';

interface RecipesListProps {
  data: Array<Recipe>;
}

const RecipesList: React.FC<RecipesListProps> = ({ data }) => (
  <div className={styles.wrapperList}>
    {data.length > 0 ? (
      data.map(({ name, meal, calories, difficulty, estimatedTime }) => (
        <RecipesListItem
          key={name}
          {...{ name, meal, calories, difficulty, estimatedTime }}
        />
      ))
    ) : (
      <h4>There are no recipes...</h4>
    )}
  </div>
);

export default RecipesList;
