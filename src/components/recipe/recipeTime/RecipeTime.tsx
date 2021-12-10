import styles from '@/components/recipe/recipeTime/RecipeTime.module.scss';
import React from 'react';

interface RecipeTimeProps {
   totalTime: number;
   prepTime: number;
   cookTime: number;
}

const RecipeTime: React.FC<RecipeTimeProps> = ({ totalTime, prepTime, cookTime }) => (
   <div className={styles.timeContainer}>
      <div className={styles.timeInfo}>
         <span className={styles.timeName}>Total time</span>
         <p className={styles.time}>{totalTime}m </p>
      </div>
      <div className={styles.timeInfo}>
         <span className={styles.timeName}>Prep time</span>
         <p className={styles.time}>{prepTime}m</p>
      </div>
      <div className={styles.timeInfo}>
         <span className={styles.timeName}>Cook time</span>
         <p className={styles.time}>{cookTime}m</p>
      </div>
   </div>
);

export default RecipeTime;
