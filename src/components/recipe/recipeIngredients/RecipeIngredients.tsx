import styles from '@/components/recipe/recipeIngredients/RecipeIngredients.module.scss';
import Minus from '@/public/recipe/minus.svg';
import Plus from '@/public/recipe/plus.svg';

interface Ingredient {
  id: string;
  weight: number;
  name: string;
}

interface RecipeIngredientsProps {
  ingredients: Array<Ingredient>;
}

const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({
  ingredients,
}) => (
  <div className={styles.ingredientsContainer}>
    <div className={styles.subTitle}>Ingredients</div>
    <div className={styles.savages}>
      <button type="button" className={styles.button}>
        <Minus className={styles.icon} />
      </button>

      <div className={styles.servingsNUM}>1 savage</div>
      <button type="button" className={styles.button}>
        <Plus className={styles.icon} />
      </button>
    </div>
    {ingredients.map(({ id, name, weight }) => (
      <div key={id} className={styles.ingredient}>
        <span className={styles.dot} />
        <p>
          {weight} {name}
        </p>
      </div>
    ))}
  </div>
);
export default RecipeIngredients;
