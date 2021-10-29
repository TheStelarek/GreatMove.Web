import styles from '@/components/recipe/recipeNurtilion/RecipeNurtilion.module.scss';

interface RecipeNurtilionProps {
   calories: number;
   protein: number;
   carbs: number;
   fats: number;
   fibre: number;
}

const RecipeNurtilion: React.FC<RecipeNurtilionProps> = ({ calories, protein, carbs, fats, fibre }) => (
   <div className={styles.nutrilionContainer}>
      <div className={styles.interval}>
         <div className={styles.subTitle}>Nurtilion per savings</div>
      </div>
      <div className={styles.nurtilions}>
         <div className={styles.nurtilion}>
            <div className={styles.nurPerSav}>Calories</div>
            <div>{calories}</div>
         </div>

         <div className={styles.nurtilion}>
            <div className={styles.nurPerSav}>Protein</div>
            <div>{protein}g</div>
         </div>

         <div className={styles.nurtilion}>
            <div className={styles.nurPerSav}>Carbs</div>
            <div>{carbs}g</div>
         </div>

         <div className={styles.nurtilion}>
            <div className={styles.nurPerSav}>Fats</div>
            <div>{fats}g</div>
         </div>

         <div className={styles.nurtilion}>
            <div className={styles.nurPerSav}>Fibre</div>
            <div>{fibre}g</div>
         </div>
      </div>
   </div>
);

export default RecipeNurtilion;
