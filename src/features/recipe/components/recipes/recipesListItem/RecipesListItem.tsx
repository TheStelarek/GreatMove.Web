import Image from 'next/image';
import styles from '@/features/recipe/components/recipes/recipesListItem/RecipesListItem.module.scss';
import { Recipe } from '@/features/recipe/utils/types/Recipe';

const RecipesListItem: React.FC<
   Pick<Recipe, 'title' | 'meal' | 'calories' | 'difficulty' | 'preparationTime' | 'cookTime'>
> = ({ title, meal, calories, difficulty, preparationTime, cookTime = 0 }) => (
   <div className={styles.recipe}>
      <div className={styles.imageContainer}>
         <Image src="/recipes/placki.jpg" alt="Picture of the author" layout="fill" objectFit="cover" />
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
);

export default RecipesListItem;