import styles from '@/components/recipe/recipeTime/RecipeTime.module.scss';

interface RecipeTimeProps {
  totalTime: number;
  prepTime: number;
  cookTime: number;
}

const RecipeTime: React.FC<RecipeTimeProps> = ({
  totalTime,
  prepTime,
  cookTime,
}) => (
  <div className={styles.timeContainer}>
    <div className={styles.timeInfo}>
      <div className={styles.textTime}> Total time </div>
      <div className={styles.textColor}> {totalTime}m </div>
    </div>
    <div className={styles.timeInfo}>
      <div className={styles.textTime}> Prep time </div>
      <div className={styles.textColor}> {prepTime}m </div>
    </div>
    <div className={styles.timeInfo}>
      <div className={styles.textTime}> Cook time</div>
      <div className={styles.textColor}> {cookTime}m </div>
    </div>
  </div>
);

export default RecipeTime;
