import { FC } from 'react';
import styles from '@/components/recipe/recipeNurtilions/RecipeNurtilions.module.scss';

interface RecipeNurtilionsProps {
   calories: number;
   protein: number;
   carbs: number;
   fats: number;
   fibre?: number;
}

const RecipeNurtilions: FC<RecipeNurtilionsProps> = ({ calories, protein, carbs, fats, fibre }) => (
   <div className={styles.nutrilionsContainer}>
      <span className={styles.title}>Nurtilion per savings</span>
      <div className={styles.nurtilions}>
         <div className={styles.nurtilionBox}>
            <span className={styles.name}>Calories</span>
            <p>{calories}</p>
         </div>
         <div className={styles.nurtilionBox}>
            <span className={styles.name}>Proteins</span>
            <p>{protein}</p>
         </div>
         <div className={styles.nurtilionBox}>
            <span className={styles.name}>Carbs</span>
            <p>{carbs}</p>
         </div>
         <div className={styles.nurtilionBox}>
            <span className={styles.name}>Fats</span>
            <p>{fats} </p>
         </div>
         {fibre && (
            <div className={styles.nurtilionBox}>
               <span className={styles.name}>Fibre</span>
               <p>{fibre}</p>
            </div>
         )}
      </div>
   </div>
);

export default RecipeNurtilions;
