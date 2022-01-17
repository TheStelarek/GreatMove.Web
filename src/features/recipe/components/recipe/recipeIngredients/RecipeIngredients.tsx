import { FC, useState } from 'react';
import Button from '@/components/core/button/Button';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { addProduct } from '@/features/shoppingList/store/ShoppingListSlice';
import { Ingredient } from '@/features/recipe/utils/types/Ingredient';
import styles from '@/features/recipe/components/recipe/recipeIngredients/RecipeIngredients.module.scss';
import { round } from '@/utils/functions/round';
import Minus from '@/public/icons/minus.svg';
import Plus from '@/public/icons/plus-2.svg';
import Shop from '@/public/icons/shop.svg';

interface RecipeIngredientsProps {
   ingredients: Ingredient[];
}

const RecipeIngredients: FC<RecipeIngredientsProps> = ({ ingredients }) => {
   const dispatch = useAppDispatch();
   const [recipeIngredients, setRecipeIngredients] = useState<Ingredient[]>(ingredients);
   const [servings, setServings] = useState<number>(1);

   const increaseServings = () => {
      if (servings < 15) {
         const increasedServings = recipeIngredients.map(({ id, name, weight }) => ({
            id,
            name,
            weight: weight + round(weight / servings),
         }));
         setServings((prevState) => prevState + 1);
         setRecipeIngredients(increasedServings);
      }
   };

   const decreaseServings = () => {
      if (servings > 1) {
         const decreasedServings = recipeIngredients.map(({ id, name, weight }) => ({
            id,
            name,
            weight: weight - round(weight / servings),
         }));
         setServings((prevState) => prevState - 1);
         setRecipeIngredients(decreasedServings);
      }
   };

   return (
      <div className={styles.ingredientsContainer}>
         <div className={styles.title}>Ingredients</div>
         <div className={styles.servingsButtons}>
            <button className={styles.decreaseBtn} onClick={decreaseServings}>
               <Minus className={styles.icon} />
            </button>
            <span className={styles.servingsNumber}>{servings} servings</span>
            <button className={styles.increaseBtn} onClick={increaseServings}>
               <Plus className={styles.icon} />
            </button>
         </div>
         <ul className={styles.ingredientsList}>
            {recipeIngredients.map(({ id, name, weight }) => (
               <li key={id} className={styles.ingredient}>
                  <span className={styles.dot} />
                  <p className={styles.name}>{`${weight} g - ${name}`}</p>
               </li>
            ))}
         </ul>
         <div className={styles.shopBtnWrapper}>
            <Button
               variant="ghost-secondary"
               size="small"
               borderRadius={5}
               isBold
               leftIcon={<Shop className={styles.shopIcon} />}
               onClick={() => dispatch(addProduct(recipeIngredients))}
            >
               Add to shopping list
            </Button>
         </div>
      </div>
   );
};
export default RecipeIngredients;
