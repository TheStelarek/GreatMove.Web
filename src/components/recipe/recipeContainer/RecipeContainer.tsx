import { FC } from 'react';
import RecipeIngredients from '@/components/recipe/recipeIngredients/RecipeIngredients';
import RecipeSteps from '@/components/recipe/recipeSteps/RecipeSteps';
import RecipeTips from '@/components/recipe/recipeTips/RecipeTips';
import RecipeNourishment from '@/components/recipe/recipeNourishment/RecipeNourishment';
import RecipeShare from '@/components/recipe/recipeShare/RecipeShare';
import RecipeTime from '@/components/recipe/recipeTime/RecipeTime';
import RecipeReviews from '@/components/recipe/recipeReviews/RecipeReviews';
import styles from '@/components/recipe/recipeContainer/RecipeContainer.module.scss';
import { Recipe } from '@/utils/types/Recipe';

interface RecipeContainerProps {
   recipe: Recipe;
}

const RecipeContainer: FC<RecipeContainerProps> = ({ recipe }) => (
   <div className={styles.recipeContainer}>
      <div className={styles.headerContainer}>
         <div className={styles.headerWrapper}>
            <div className={styles.headerContent}>
               <h1 className={styles.title}>{recipe.name}</h1>
               <div className={styles.timeWrapper}>
                  <RecipeTime prepTime={recipe.preparationTime} cookTime={recipe.cookTime} />
                  <RecipeShare />
               </div>
            </div>
         </div>
      </div>
      <div className={styles.recipeContent}>
         <div className={styles.leftContainer}>
            <p className={styles.recipeDescription}>{recipe.description}</p>
            <RecipeSteps steps={recipe.steps} />
            <RecipeNourishment
               calories={recipe.calories}
               proteins={recipe.proteins}
               carbs={recipe.carbs}
               fats={recipe.fats}
               fibre={recipe.fibre}
            />
            {recipe.tips && <RecipeTips tips={recipe.tips} />}
            <RecipeReviews />
         </div>
         <div className={styles.rightContainer}>
            <div className={styles.foodImage}>
               <img className={styles.image} alt="finished product" src={recipe.pictureUrl} />
            </div>
            <RecipeIngredients ingredients={recipe.ingredients} />
         </div>
      </div>
   </div>
);

export default RecipeContainer;
