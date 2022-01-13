import Link from 'next/link';
import styles from '@/features/recipe/components/recipes/recipesListItem/RecipesListItem.module.scss';
import { Recipe } from '@/features/recipe/utils/types/Recipe';

const RecipesListItem: React.FC<
   Pick<Recipe, 'id' | 'title' | 'meal' | 'calories' | 'difficulty' | 'preparationTime' | 'cookTime' | 'pictureUrl'>
> = ({ id, title, meal, calories, difficulty, preparationTime, cookTime = 0, pictureUrl }) => (
   <Link href={`/recipes/id/${id}/${title}`}>
      <div className={styles.recipe}>
         <div className={styles.imageContainer}>
            <img src={pictureUrl} alt={`recipe ${title}`} />
         </div>
         <div className={styles.content}>
            <div className={styles.meal}>
               <p className={styles.type}>{meal}</p>
               <p className={styles.calories}>Calories: {calories}</p>
            </div>
            <p className={styles.name}>{title}</p>
            <div className={styles.difficulty}>
               <p className={styles.level}>{difficulty}</p>
               <p className={styles.estimatedTime}>{preparationTime + cookTime} MINS</p>
            </div>
         </div>
      </div>
   </Link>
);

export default RecipesListItem;
