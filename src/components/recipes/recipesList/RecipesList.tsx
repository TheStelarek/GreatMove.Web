import styles from '@/components/recipes/recipesList/RecipesList.module.scss';
import { Recipe } from '@/utils/types/Recipe';
import Pagination from '@/components/core/pagination/Pagination';
import RecipesListItem from '@/components/recipes/recipesListItem/RecipesListItem';

interface RecipesListProps {
  recipes: Array<Recipe>;
  totalPages: number;
  currentPage: string;
}

const RecipesList: React.FC<RecipesListProps> = ({
  recipes,
  totalPages,
  currentPage,
}) => (
  <div className={styles.container}>
    <div className={styles.wrapperList}>
      {recipes.length > 0 ? (
        recipes.map(({ name, meal, calories, difficulty, estimatedTime }) => (
          <RecipesListItem
            key={name}
            {...{ name, meal, calories, difficulty, estimatedTime }}
          />
        ))
      ) : (
        <h4>There are no recipes...</h4>
      )}
    </div>
    <Pagination totalPages={totalPages} currentPage={currentPage} />
  </div>
);

export default RecipesList;
