import { FC } from 'react';
import styles from '@/features/recipe/components/recipe/recipeTime/RecipeTime.module.scss';

interface RecipeTimeProps {
   prepTime: number;
   cookTime?: number;
}

const RecipeTime: FC<RecipeTimeProps> = ({ prepTime, cookTime = 0 }) => (
   <div className={styles.timeContainer}>
      <div className={styles.timeInfo}>
         <span className={styles.timeName}>Total time</span>
         <p className={styles.time}>{prepTime + cookTime}m </p>
      </div>
      <div className={styles.timeInfo}>
         <span className={styles.timeName}>Prep time</span>
         <p className={styles.time}>{prepTime}m</p>
      </div>
      {cookTime && (
         <div className={styles.timeInfo}>
            <span className={styles.timeName}>Cook time</span>
            <p className={styles.time}>{cookTime}m</p>
         </div>
      )}
   </div>
);

export default RecipeTime;
