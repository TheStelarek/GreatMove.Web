import { useEffect, useState } from 'react';
import styles from '@/components/recipe/recipeIngredients/RecipeIngredients.module.scss';
import Minus from '@/public/recipe/minus.svg';
import Plus from '@/public/recipe/plus.svg';
import Shop from '@/public/recipe/shop.svg';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { addProduct } from '@/store/shoppingList/ShoppingListSlice';
import { Ingredient } from '@/utils/types/Ingredient';

interface RecipeIngredientsProps {
  ingredients: Array<Ingredient>;
}

const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({
  ingredients,
}) => {
  const dispatch = useAppDispatch();
  const [recipeIngredients, setRecipeIngredients] = useState<Ingredient[]>([]);
  const [servings, setServings] = useState<number>(1);

  useEffect(() => {
    setRecipeIngredients(ingredients);
  }, []);

  const increaseServings = () => {
    if (servings < 15 && recipeIngredients.length) {
      const increasedServings = recipeIngredients.map(
        ({ id, name, weight }) => ({
          id,
          name,
          weight: weight * 2,
        }),
      );
      setServings((prevState) => prevState + 1);
      setRecipeIngredients(increasedServings);
    }
  };

  const decreaseServings = () => {
    if (servings > 1 && recipeIngredients.length) {
      const decreasedServings = recipeIngredients.map(
        ({ id, name, weight }) => ({
          id,
          name,
          weight: weight / 2,
        }),
      );
      setServings((prevState) => prevState - 1);
      setRecipeIngredients(decreasedServings);
    }
  };

  const addToShopList = () => dispatch(addProduct(recipeIngredients));

  return (
    <div className={styles.ingredientsContainer}>
      <div className={styles.subTitle}>Ingredients</div>
      <div className={styles.savages}>
        <button type="button" className={styles.button}>
          <Minus className={styles.icon} onClick={decreaseServings} />
        </button>
        <div className={styles.servingsNUM}>{servings} servings</div>
        <button type="button" className={styles.button}>
          <Plus className={styles.icon} onClick={increaseServings} />
        </button>
      </div>
      {!!recipeIngredients?.length &&
        recipeIngredients.map(({ id, name, weight }) => (
          <div key={id} className={styles.ingredient}>
            <span className={styles.dot} />
            <p>
              {weight} {name}
            </p>
          </div>
        ))}
      <button type="button" className={styles.button} onClick={addToShopList}>
        <Shop className={styles.icon} />
      </button>
    </div>
  );
};
export default RecipeIngredients;
