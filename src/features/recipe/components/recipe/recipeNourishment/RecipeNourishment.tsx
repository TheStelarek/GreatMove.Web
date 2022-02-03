import { FC } from 'react';
import styles from '@/features/recipe/components/recipe/recipeNourishment/RecipeNourishment.module.scss';

interface RecipeNurtilionsProps {
   calories: number;
   proteins: number;
   carbs: number;
   fats: number;
   fibre?: number;
}

const RecipeNourishment: FC<RecipeNurtilionsProps> = ({ calories, proteins, carbs, fats, fibre }) => (
   <div className={styles.nutrilionsContainer}>
      <span className={styles.title}>Nurtilion per savings</span>
      <div className={styles.nurtilions}>
         <div className={styles.nurtilionBox}>
            <span className={styles.name}>Calories</span>
            <p>{calories}</p>
         </div>
         <div className={styles.nurtilionBox}>
            <span className={styles.name}>Proteins</span>
            <p>{proteins}</p>
         </div>
         <div className={styles.nurtilionBox}>
            <span className={styles.name}>Carbs</span>
            <p>{carbs}</p>
         </div>
         <div className={styles.nurtilionBox}>
            <span className={styles.name}>Fats</span>
            <p>{fats} </p>
         </div>
         {!!fibre && (
            <div className={styles.nurtilionBox}>
               <span className={styles.name}>Fibre</span>
               <p>{fibre}</p>
            </div>
         )}
      </div>
   </div>
);

export default RecipeNourishment;
